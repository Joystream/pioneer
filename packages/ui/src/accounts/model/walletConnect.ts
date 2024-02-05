import { Signer } from '@polkadot/api/types'
import { WalletConnectModal } from '@walletconnect/modal'
import { SessionTypes } from '@walletconnect/types'
import { IUniversalProvider, UniversalProvider } from '@walletconnect/universal-provider'
import { MetadataDef, SubscriptionFn, WalletAccount } from 'injectweb3-connect'

import { PioneerWallet } from './wallets'

export class WalletConnect extends PioneerWallet {
  public static source = 'WalletConnect'

  protected _projectId: string
  protected _chainCAIP: string
  protected _provider: IUniversalProvider | undefined
  protected _walletConnectSession: SessionTypes.Struct | undefined
  protected _accounts: WalletAccount[] | undefined

  constructor(projectId: string, genesisHash: string) {
    super({
      extensionName: 'WalletConnect',
      title: 'WalletConnect',
      logo: { src: '', alt: 'WalletConnect Logo' },
    })

    this._projectId = projectId
    this._chainCAIP = `polkadot:${genesisHash.slice(2, 34)}`
  }

  enable = async (): Promise<void> => {
    const provider = await UniversalProvider.init({
      projectId: this._projectId,
      relayUrl: 'wss://relay.walletconnect.com',
    })
    this._provider = provider

    const requiredNamespaces = {
      polkadot: {
        methods: ['polkadot_signTransaction', 'polkadot_signMessage'],
        chains: [this._chainCAIP],
        events: ['chainChanged", "accountsChanged'],
      },
    }
    const { uri, approval } = await provider.client.connect({ requiredNamespaces })

    const walletConnectModal = new WalletConnectModal({ projectId: this._projectId })

    // if there is a URI from the client connect step open the modal
    if (uri) {
      walletConnectModal.openModal({ uri })
    }
    // await session approval from the wallet app
    const walletConnectSession = await approval()
    this._walletConnectSession = walletConnectSession

    this._accounts = Object.values(walletConnectSession.namespaces)
      .flatMap((namespace) => namespace.accounts)
      .map((account): WalletAccount => {
        const address = account.split(':')[2]
        const source = this.extensionName
        return { address, source }
      })

    walletConnectModal.closeModal()
  }

  getAccounts = async (): Promise<WalletAccount[]> => {
    return Promise.resolve(this._accounts ?? [])
  }

  subscribeAccounts: (callback: SubscriptionFn) => Promise<() => void> = (callback) => {
    callback(this._accounts ?? [])
    return Promise.resolve(() => undefined)
  }

  updateMetadata: (chainInfo: MetadataDef) => Promise<boolean> = () => Promise.resolve(true)

  public getSigner = (address: string): Signer => ({
    signPayload: (transactionPayload) => {
      if (!this._provider?.client) throw Error('The WalletConnect was accessed before it was enabled.')
      if (!this._walletConnectSession) throw Error('walletConnectSession is not available yet.')

      return this._provider.client.request({
        chainId: this._chainCAIP,
        topic: this._walletConnectSession.topic,
        request: {
          method: 'polkadot_signTransaction',
          params: { address, transactionPayload },
        },
      })
    },
  })
}
