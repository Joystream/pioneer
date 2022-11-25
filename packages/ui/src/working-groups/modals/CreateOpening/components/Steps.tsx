import React from 'react'

import {
  ApplicationForm,
  DurationAndProcess,
  StakingPolicyAndReward,
  WorkingGroupAndDescription,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CreateWorkingGroupLeadOpening'

import { CreateOpeningMachineState } from '../machine'

export interface CreateOpeningStepProps {
  matches: CreateOpeningMachineState['matches']
}

export const CreateOpeningSteps = ({ matches }: CreateOpeningStepProps) => {
  switch (true) {
    case matches('specificParameters.createWorkingGroupLeadOpening.workingGroupAndDescription'):
      return <WorkingGroupAndDescription />

    case matches('specificParameters.createWorkingGroupLeadOpening.durationAndProcess'):
      return <DurationAndProcess />

    case matches('specificParameters.createWorkingGroupLeadOpening.applicationForm'):
      return <ApplicationForm />

    case matches('specificParameters.createWorkingGroupLeadOpening.stakingPolicyAndReward'):
      return <StakingPolicyAndReward />

    default:
      return null
  }
}
