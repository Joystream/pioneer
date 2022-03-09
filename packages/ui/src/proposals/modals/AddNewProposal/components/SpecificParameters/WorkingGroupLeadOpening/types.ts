import BN from 'bn.js'

import { GroupIdName } from '@/working-groups/types'

export interface StakingPolicyAndRewardParameters {
  stakingAmount?: BN
  leavingUnstakingPeriod?: number
  rewardPerBlock?: BN
}

// TODO move this somewhere else once #2506 is merged
interface Question {
  questionField: string
  shortValue: boolean
}

export interface WorkingGroupAndDescriptionParameters {
  title?: string
  description?: string
  shortDescription?: string
  groupId?: GroupIdName
}

export interface DurationAndProcessParameters {
  details?: string
  duration?: number
}

export interface ApplicationFormParameters {
  questions?: Question[]
}

export type CreateWorkingGroupLeadOpeningParameters = WorkingGroupAndDescriptionParameters &
  DurationAndProcessParameters &
  ApplicationFormParameters &
  StakingPolicyAndRewardParameters

export interface CancelWorkingGroupLeadOpeningParameters {
  groupId?: GroupIdName
  openingId?: string
}
