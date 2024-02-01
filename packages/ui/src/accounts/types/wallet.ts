import { Signer } from '@polkadot/types/types'
import { Wallet as InjectedWallet } from 'injectweb3-connect'

export type Wallet = Omit<InjectedWallet, 'signer'> & { getSigner: (address: string) => Signer | undefined }
