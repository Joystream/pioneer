import React from 'react'

import { TokenValue } from '@/common/components/typography'

import { BudgetSetActivity } from '../../types'

interface Props {
  activity: BudgetSetActivity
}
export const BudgetSetContent = React.memo(({ activity }: Props) => (
  <>
    {activity.groupName} Working Group Lead has changed the group budget to <TokenValue value={activity.newBudget} />.
  </>
))
