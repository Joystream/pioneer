import React from 'react'

import { ApplicationWithdrawnContent } from '@/working-groups/components/Activities/ApplicationWithdrawnContent'
import { AppliedOnOpeningContent } from '@/working-groups/components/Activities/AppliedOnOpeningContent'
import { BudgetSetContent } from '@/working-groups/components/Activities/BudgetSetContent'
import { BudgetSpendingContent } from '@/working-groups/components/Activities/BudgetSpendingContent'
import { LeaderSetContent } from '@/working-groups/components/Activities/LeaderSetContent'
import { OpeningAddedContent } from '@/working-groups/components/Activities/OpeningAddedContent'
import { OpeningCanceledContent } from '@/working-groups/components/Activities/OpeningCanceledContent'
import { StakeChangedContent } from '@/working-groups/components/Activities/StakeChangedContent'
import { StakeSlashedContent } from '@/working-groups/components/Activities/StakeSlashedContent'
import { StatusTextChangedContent } from '@/working-groups/components/Activities/StatusTextChangedContent'
import { WorkerExitedContent } from '@/working-groups/components/Activities/WorkerExitedContent'
import { WorkerStartedLeavingContent } from '@/working-groups/components/Activities/WorkerStartedLeavingContent'

import { Activity } from '../../types'

interface Props {
  activity: Activity
}

export const ActivityContent = React.memo(({ activity }: Props) => {
  switch (activity.eventType) {
    case 'AppliedOnOpening':
      return <AppliedOnOpeningContent activity={activity} />
    case 'BudgetSpending':
      return <BudgetSpendingContent activity={activity} />
    case 'ApplicationWithdrawn':
      return <ApplicationWithdrawnContent activity={activity} />
    case 'BudgetSet':
      return <BudgetSetContent activity={activity} />
    case 'LeaderSet':
      return <LeaderSetContent activity={activity} />
    case 'StatusTextChanged':
      return <StatusTextChangedContent activity={activity} />
    case 'OpeningAdded':
      return <OpeningAddedContent activity={activity} />
    case 'OpeningCanceled':
      return <OpeningCanceledContent activity={activity} />
    case 'StakeSlashed':
      return <StakeSlashedContent activity={activity} />
    case 'StakeDecreased':
    case 'StakeIncreased':
      return <StakeChangedContent activity={activity} />
    case 'WorkerExited':
      return <WorkerExitedContent activity={activity} />
    case 'WorkerStartedLeaving':
      return <WorkerStartedLeavingContent activity={activity} />
    default:
      return <div />
  }
})
