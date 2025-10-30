import BN from 'bn.js'
import { Observable } from 'rxjs'

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

export interface ValidatorWithDetails extends Validator {
  isVerifiedValidator?: boolean
  membership?: MemberWithDetails
  isActive?: boolean
  totalRewards?: BN
  rewardPointsHistory?: RewardPoints[]
  APR?: number
  staking?: { total: BN; own: BN; nominators: Nominator[] }
  slashed?: number
}

interface Nominator {
  address: Address
  staking: BN
}

export interface ValidatorDetailsFilter {
  search?: string
  isVerified?: boolean
  isActive?: boolean
}

export interface ValidatorDetailsOrder {
  key: 'default' | 'commission' | 'apr'
  isDescending: boolean
}

export type ValidatorInfo = {
  validator: ValidatorWithDetails
  isActive$: Observable<Pick<ValidatorWithDetails, 'isActive'>>
  reward$: Observable<Pick<ValidatorWithDetails, 'totalRewards' | 'rewardPointsHistory'>>
  apr$: Observable<Pick<ValidatorWithDetails, 'APR'>>
  staking$: Observable<Pick<ValidatorWithDetails, 'staking'>>
  slashed$: Observable<Pick<ValidatorWithDetails, 'slashed'>>
}
