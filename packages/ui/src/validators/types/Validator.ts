import BN from 'bn.js'

import { Address } from '@/common/types'
import { MemberWithDetails } from '@/memberships/types'

export interface RewardPoints {
  era: number
  rewardPoints: number
}

export interface Validator {
  stashAccount: Address
  controllerAccount?: Address
  commission: number
}

export interface ValidatorMembership extends Validator {
  isVerifiedValidator?: boolean
  membership?: MemberWithDetails
}

export interface ValidatorWithDetails extends ValidatorMembership {
  isActive?: boolean
  totalRewards?: BN
  rewardPointsHistory?: RewardPoints[]
  APR?: number
  staking?: {
    total: BN
    own: BN
    others: {
      address: Address
      staking: BN
    }[]
  }
  slashed?: number
}

export interface ValidatorDetailsFilter {
  search?: string
  isVerified?: boolean
  isActive?: boolean
}
