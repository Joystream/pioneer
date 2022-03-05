import BN from 'bn.js'

import { GroupIdName } from '@/working-groups/types'

export interface StakingPolicyAndRewardParameters {
  stakingAmount?: BN
  leavingUnstakingPeriod?: number
  rewardPerBlock?: BN
}

export interface WorkingGroupAndOpeningDetailsParameters {
  description?: string
  shortDescription?: string
  groupId?: GroupIdName
}

export interface CancelWorkingGroupLeadOpeningParameters {
  openingId?: string
}
