import BN from 'bn.js'

import { Address } from '../../common/types'

export interface BalanceLockInfo {
  amount: BN
  reason: string
}

export interface Balances {
  total: BN
  locked: BN
  recoverable: BN
  transferable: BN
  locks: BalanceLockInfo[]
}

export type AddressToBalanceMap = {
  [key in Address]: Balances
}
