import BN from 'bn.js'

import { QuestionValueProps } from '@/common/components/EditableInputList/EditableInputList'
import { OpeningDurationProps } from '@/common/components/OpeningDuration/OpeningDuration'
import { GroupIdName } from '@/working-groups/types'

export interface StakingPolicyAndRewardParameters {
  stakingAmount?: BN
  leavingUnstakingPeriod?: number
  rewardPerBlock?: BN
}

export interface WorkingGroupAndDescriptionParameters {
  title?: string
  description?: string
  shortDescription?: string
  groupId?: GroupIdName
}

export interface DurationAndProcessParameters {
  details?: string
  duration?: OpeningDurationProps['value']
}

export interface ApplicationFormParameters {
  questions?: QuestionValueProps[]
}

export type CreateWorkingGroupLeadOpeningParameters = WorkingGroupAndDescriptionParameters &
  DurationAndProcessParameters &
  ApplicationFormParameters &
  StakingPolicyAndRewardParameters

export interface CancelWorkingGroupLeadOpeningParameters {
  groupId?: GroupIdName
  openingId?: string
}
