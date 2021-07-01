import React, { ReactElement } from 'react'

import { Activity, ActivityCategory, BaseActivity } from '@/common/types/Activity'
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

export interface ActivityContentComponent<Activity extends BaseActivity> {
  (props: { activity: Activity; isOwn?: boolean }): ReactElement | null
}

const ActivityMap: Record<ActivityCategory, ActivityContentComponent<any>> = {
  AppliedOnOpening: AppliedOnOpeningContent,
  ApplicationWithdrawn: ApplicationWithdrawnContent,
  BudgetSpending: BudgetSpendingContent,
  BudgetSet: BudgetSetContent,
  LeaderSet: LeaderSetContent,
  StatusTextChanged: StatusTextChangedContent,
  OpeningAdded: OpeningAddedContent,
  OpeningCanceled: OpeningCanceledContent,
  StakeSlashed: StakeSlashedContent,
  StakeDecreased: StakeChangedContent,
  StakeIncreased: StakeChangedContent,
  WorkerExited: WorkerExitedContent,
  WorkerStartedLeaving: WorkerStartedLeavingContent,
}

export const ActivityContent = React.memo(({ activity, isOwn }: { activity: Activity; isOwn?: boolean }) => {
  const Content = ActivityMap[activity.eventType]
  return <Content activity={activity} isOwn={isOwn} />
})
