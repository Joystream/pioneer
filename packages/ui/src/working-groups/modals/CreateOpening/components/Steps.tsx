import React from 'react'

import {
  ApplicationForm,
  DurationAndProcess,
  StakingPolicyAndReward,
  WorkingGroupAndDescription,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CreateWorkingGroupLeadOpening'
import { GroupIdName } from '@/working-groups/types'

import { CreateOpeningMachineState } from '../machine'

export interface CreateOpeningStepProps {
  matches: CreateOpeningMachineState['matches']
  groupId?: GroupIdName
}

export const CreateOpeningSteps = ({ matches, groupId }: CreateOpeningStepProps) => {
  switch (true) {
    case matches('workingGroupAndDescription'):
      return <WorkingGroupAndDescription noHeader={true} groupId={groupId} />

    case matches('durationAndProcess'):
      return <DurationAndProcess noHeader={true} />

    case matches('applicationForm'):
      return <ApplicationForm noHeader={true} />

    case matches('stakingPolicyAndReward'):
      return <StakingPolicyAndReward noHeader={true} />

    default:
      return <></>
  }
}
