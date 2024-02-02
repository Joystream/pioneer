import { Signer } from '@polkadot/types/types'
import { Wallet as InjectedWallet } from 'injectweb3-connect'

export type Wallet = Pick<
  InjectedWallet,
  | 'enable'
  | 'getAccounts'
  | 'subscribeAccounts'
  | 'walletAccountToInjectedAccountWithMeta'
  | 'updateMetadata' // NOTE this won't work with Wallet connect
  | 'extensionName'
  | 'extension'
  | 'installed'
  | 'installUrl'
  | 'logo'
  | 'title'
> & {
  getSigner: (address: string) => Signer | undefined
}
