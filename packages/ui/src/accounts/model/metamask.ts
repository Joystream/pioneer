import { enablePolkadotSnap } from '@chainsafe/metamask-polkadot-adapter'
import { MetamaskSnapApi } from '@chainsafe/metamask-polkadot-adapter/build/types'
import { SnapNetworks } from '@chainsafe/metamask-polkadot-types'
import { Signer } from '@polkadot/types/types'
import { BaseDotsamaWallet, SubscriptionFn, WalletAccount } from 'injectweb3-connect'

import MetamaskLogo from '@/app/assets/images/logos/Metamask.svg'
import { CHAIN_PROPERTIES } from '@/app/constants/chain'

const networkName = 'joystream' as SnapNetworks
const addressPrefix = CHAIN_PROPERTIES.ss58Format
const unit = { symbol: CHAIN_PROPERTIES.tokenSymbol[0], decimals: CHAIN_PROPERTIES.tokenDecimals[0] }

export class Metamask extends BaseDotsamaWallet {
  protected _snapId: string
  protected _httpRpcUrl: string
  protected _snapApi: MetamaskSnapApi | undefined
  protected _accounts: WalletAccount[] | undefined
  protected _txId = 0

  constructor(snapId: string, httpRpcUrl: string) {
    super({
      extensionName: 'Metamask',
      title: 'Metamask',
      logo: { src: MetamaskLogo, alt: 'Metamask Logo' },
    })

    this._snapId = snapId
    this._httpRpcUrl = httpRpcUrl
  }

  public enable = async (): Promise<void> => {
    const snap = await enablePolkadotSnap(
      { networkName, wsRpcUrl: this._httpRpcUrl, addressPrefix, unit },
      this._snapId
    )

    this._snapApi = await snap.getMetamaskSnapApi()
    const address = await this._snapApi.getAddress()
    this._accounts = [
      {
        name: 'Metamask account',
        address,
        source: this.extensionName,
      },
    ]

    this._snapApi.signPayloadJSON
  }

  public getAccounts = async (): Promise<WalletAccount[]> => {
    return this._accounts ?? []
  }

  public subscribeAccounts: (callback: SubscriptionFn) => Promise<() => void> = (callback) => {
    callback(this._accounts ?? [])
    return Promise.resolve(() => undefined)
  }

  public get signer(): Signer {
    return {
      signPayload: async (payload) => {
        if (!this._snapApi) {
          throw Error('Metamask was accessed before it was enabled')
        }

        const signature = (await this._snapApi.signPayloadJSON(payload)) as `0x${string}`

        return { id: this._txId++, signature }
      },

      signRaw: async (raw) => {
        if (!this._snapApi) {
          throw Error('Metamask was accessed before it was enabled')
        }

        const signature = (await this._snapApi.signPayloadRaw(raw)) as `0x${string}`

        return { id: this._txId++, signature }
      },
    }
  }
}
