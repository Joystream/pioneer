import BN from 'bn.js'

import { Address } from '../../common/types'

export interface Balances {
  total: BN
  locked: BN
  recoverable: BN
  transferable: BN
}

export type AddressToBalanceMap = {
  [key in Address]: Balances
}
