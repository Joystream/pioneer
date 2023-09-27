import React from 'react'

import { ApplicationForm } from '@/app/pages/WorkingGroups/WorkingGroup/components/CreateOpening/ApplicationForm'
import { DurationAndProcess } from '@/app/pages/WorkingGroups/WorkingGroup/components/CreateOpening/DurationAndProcess'
import { StakingPolicyAndReward } from '@/app/pages/WorkingGroups/WorkingGroup/components/CreateOpening/StakingPolicyAndReward'
import { WorkingGroupAndDescription } from '@/app/pages/WorkingGroups/WorkingGroup/components/CreateOpening/WorkingGroupAndDescription'
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
      return <DurationAndProcess />

    case matches('applicationForm'):
      return <ApplicationForm />

    case matches('stakingPolicyAndReward'):
      return <StakingPolicyAndReward />

    default:
      return <></>
  }
}
