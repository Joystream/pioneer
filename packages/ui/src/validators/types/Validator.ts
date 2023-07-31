import BN from 'bn.js'

import { Address } from '@/common/types'

export interface Validator {
  address: Address
  verification: boolean
  state: boolean
  totalRewards: BN
  APR: number
  startedOn: number
}
