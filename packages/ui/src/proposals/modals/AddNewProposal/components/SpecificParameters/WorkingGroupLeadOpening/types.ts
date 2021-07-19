import BN from 'bn.js'

export interface StakingPolicyAndRewardParameters {
  stakingAmount?: BN
  leavingUnstakingPeriod?: number
  rewardPerBlock?: BN
}

export interface WorkingGroupAndOpeningDetailsParameters {
  description?: string
  shortDescription?: string
  groupId?: string
}
