import BN from 'bn.js'

import { Address } from '@/common/types'
import { MemberWithDetails } from '@/memberships/types'

export interface Validator {
  member?:MemberWithDetails
  address: Address
  verification: boolean
  state: boolean
  totalRewards: BN
  APR: number
  startedOn: number
}
