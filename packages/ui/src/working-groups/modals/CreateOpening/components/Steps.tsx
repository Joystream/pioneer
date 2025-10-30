import React from 'react'

import { ApplicationForm } from '@/working-groups/components/CreateOpening/ApplicationForm'
import { DurationAndProcess } from '@/working-groups/components/CreateOpening/DurationAndProcess'
import { StakingPolicyAndReward } from '@/working-groups/components/CreateOpening/StakingPolicyAndReward'
import { WorkingGroupAndDescription } from '@/working-groups/components/CreateOpening/WorkingGroupAndDescription'
import { GroupIdName } from '@/working-groups/types'

import { CreateOpeningMachineState } from '../machine'

export interface CreateOpeningStepProps {
  matches: CreateOpeningMachineState['matches']
  groupId?: GroupIdName
}

export const CreateOpeningSteps = ({ matches, groupId }: CreateOpeningStepProps) => {
  switch (true) {
    case matches('workingGroupAndDescription'):
      return <WorkingGroupAndDescription groupId={groupId} />

    case matches('durationAndProcess'):
      return <DurationAndProcess hasHiringTarget />

    case matches('applicationForm'):
      return <ApplicationForm />

    case matches('stakingPolicyAndReward'):
      return <StakingPolicyAndReward />

    default:
      return <></>
  }
}
