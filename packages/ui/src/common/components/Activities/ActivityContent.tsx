import React from 'react'

import { AppliedOnOpeningContent } from '@/working-groups/components/Activities/AppliedOnOpeningContent'
import { BudgetSpendingContent } from '@/working-groups/components/Activities/BudgetSpendingContent'

import { Activity } from '../../types'

interface Props {
  activity: Activity
}

export const ActivityContent = React.memo(({ activity }: Props) => {
  switch (activity.eventType) {
    case 'AppliedOnOpeningEvent':
      return <AppliedOnOpeningContent activity={activity} />
    case 'BudgetSpendingEvent':
      return <BudgetSpendingContent activity={activity} />
    default:
      return <>{activity.eventType}</>
  }
})
