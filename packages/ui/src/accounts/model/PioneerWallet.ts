import { Signer } from '@polkadot/types/types'
import { BaseDotsamaWallet } from 'injectweb3-connect'

export class PioneerWallet extends BaseDotsamaWallet {
  public getSigner: (address: string) => Signer | undefined = () => this.signer
}
