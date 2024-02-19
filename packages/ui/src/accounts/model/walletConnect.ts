import { Signer } from '@polkadot/api/types'
import { WalletConnectModal } from '@walletconnect/modal'
import { SessionTypes } from '@walletconnect/types'
import { UniversalProvider } from '@walletconnect/universal-provider'
import type { UniversalProvider as Provider } from '@walletconnect/universal-provider/dist/types/UniversalProvider.d.ts'
import { BaseDotsamaWallet, MetadataDef, SubscriptionFn, WalletAccount } from 'injectweb3-connect'
import { Observable } from 'rxjs'

import WalletConnectLogo from '@/app/assets/images/logos/WalletConnect.svg'

export class WalletConnect extends BaseDotsamaWallet {
  public static source = 'WalletConnect'

  protected _projectId: string
  protected _chainCAIP: string
  protected _provider: Provider | undefined
  protected _accounts: WalletAccount[] | undefined

  protected _disconnection$: Observable<void>
  protected _disconnect: () => void

  constructor(projectId: string, genesisHash: string, disconnection$: Observable<void>, disconnect: () => void) {
    super({
      extensionName: 'WalletConnect',
      title: 'WalletConnect',
      logo: { src: WalletConnectLogo, alt: 'WalletConnect Logo' },
    })

    this._projectId = projectId
    this._chainCAIP = `polkadot:${genesisHash.slice(2, 34)}`
    this._disconnection$ = disconnection$
    this._disconnect = disconnect
  }

  public enable = async (): Promise<void> => {
    this._provider =
      this._provider ??
      (await UniversalProvider.init({
        projectId: this._projectId,
        relayUrl: 'wss://relay.walletconnect.com',
      }))

    this._provider.session = await this._getSession(this._provider)

    this._handleDisconnection(this._provider)

    this._accounts = Object.values(this._provider.session.namespaces)
      .flatMap((namespace) => namespace.accounts)
      .map((account): WalletAccount => {
        const address = account.split(':')[2]
        const source = this.extensionName
        return { address, source }
      })
  }

  protected async _getSession(provider: Provider): Promise<SessionTypes.Struct> {
    if (provider.session) return provider.session

    const lastSession = provider.client.session.getAll().at(-1)
    if (lastSession) return lastSession

    const requiredNamespaces = {
      polkadot: {
        methods: ['polkadot_signTransaction', 'polkadot_signMessage'],
        chains: [this._chainCAIP],
        events: ['chainChanged", "accountsChanged'],
      },
    }

    const { uri, approval } = await provider.client.connect({ requiredNamespaces })

    const wcModal = new WalletConnectModal({ projectId: this._projectId })

    // if there is a URI from the client connect step open the modal
    if (uri) {
      wcModal.openModal({ uri })
    }

    // await session approval from the wallet app
    const session = await approval()

    wcModal.closeModal()

    return session
  }

  protected _handleDisconnection(provider: Provider): void {
    const appDisconnectHandler = () => {
      if (!this._provider?.session) return

      reset()

      // `client.disconnect` doesn't work (it keeps the connection opened).
      provider.client.disconnect({
        topic: this._provider.session.topic,
        reason: { code: -1, message: 'Disconnected by client!' },
      })
    }
    const disconnectSubscription = this._disconnection$.subscribe(appDisconnectHandler)

    const walletDisconnectHandler = () => {
      reset()
      this._disconnect()
    }
    provider.client.once('session_delete', walletDisconnectHandler)
    provider.client.once('session_expire', walletDisconnectHandler)

    const reset = () => {
      if (!this._provider?.session) return

      disconnectSubscription.unsubscribe()
      this._provider?.client.off('session_delete', walletDisconnectHandler)
      this._provider?.client.off('session_expire', walletDisconnectHandler)
      this._provider.session = undefined
    }
  }

  public getAccounts = async (): Promise<WalletAccount[]> => {
    return Promise.resolve(this._accounts ?? [])
  }

  public subscribeAccounts: (callback: SubscriptionFn) => Promise<() => void> = (callback) => {
    callback(this._accounts ?? [])
    return Promise.resolve(() => undefined)
  }

  public updateMetadata: (chainInfo: MetadataDef) => Promise<boolean> = () => Promise.resolve(true)

  public get signer(): Signer {
    return {
      signPayload: (transactionPayload) => {
        if (!this._provider?.session) throw Error('The WalletConnect was accessed before it was enabled.')

        return this._provider.client.request({
          chainId: this._chainCAIP,
          topic: this._provider.session.topic,
          request: {
            method: 'polkadot_signTransaction',
            params: { address: transactionPayload.address, transactionPayload },
          },
        })
      },

      signRaw: (raw) => {
        if (!this._provider?.session) throw Error('The WalletConnect was accessed before it was enabled.')

        return this._provider.client.request({
          chainId: this._chainCAIP,
          topic: this._provider.session.topic,
          request: {
            method: 'polkadot_signMessage',
            params: { address: raw.address, message: raw.data },
          },
        })
      },
    }
  }
}
