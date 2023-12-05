import BN from 'bn.js'

import { Address } from '@/common/types'
import { MemberWithDetails } from '@/memberships/types'

export interface ValidatorWithDetails extends ValidatorMembership {
  isVerified?: boolean
  isActive: boolean
  totalRewards: BN
  APR: number
  staking: {
    total: BN
    own: BN
    others: {
      address: Address
      staking: BN
    }[]
  }
  slashed: number
}

export interface ValidatorMembership {
  stashAccount: Address
  controllerAccount?: Address
  isVerifiedValidator?: boolean
  membership?: MemberWithDetails
  commission: number
}
