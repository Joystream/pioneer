import BN from 'bn.js'
import React from 'react'

import { AddNewProposalMachineState } from '@/proposals/modals/AddNewProposal/machine'

export interface WorkingGroupAndOpeningDetailsParameters {
  description?: string
  shortDescription?: string
  groupId?: string
}

export interface StakingPolicyAndRewardDetailsParameters {
  stakingAmount?: BN
  leavingUnstakingPeriod?: number
  rewardPerBlock?: BN
}

export type WorkingGroupLeadOpeningParameters =
  | WorkingGroupAndOpeningDetailsParameters
  | StakingPolicyAndRewardDetailsParameters

interface Props {
  state: AddNewProposalMachineState
}

export const CreateWorkingGroupLeadOpening = (props: Props) => <div>Opening Details</div>
