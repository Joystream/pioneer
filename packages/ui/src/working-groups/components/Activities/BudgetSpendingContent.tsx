import React from 'react'

import { TokenValue } from '@/common/components/typography'

import { BudgetSpendingActivity } from '../../types'

interface Props {
  activity: BudgetSpendingActivity
}

export const BudgetSpendingContent = React.memo(({ activity }: Props) => (
  <>
    {activity.groupName} Lead spent <TokenValue value={activity.amount} /> from the budget.
  </>
))
