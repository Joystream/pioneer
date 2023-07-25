import BN from 'bn.js'

import { Address } from '@/common/types'

export interface Validator {
  member: boolean
  address: Address
  verification: boolean
  state: boolean
  totalRewards: BN
  APR: number
  startedOn: number
}
