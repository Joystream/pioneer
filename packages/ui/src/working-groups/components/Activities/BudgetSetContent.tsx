import React from 'react'

import { ActivityContentProps } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'

import { BudgetSetActivity } from '../../types'

export const BudgetSetContent: React.FC<ActivityContentProps> = React.memo(({ activity }) => {
  const { groupName, newBudget } = activity as BudgetSetActivity
  return (
    <>
      {groupName} Working Group Lead has changed the group budget to <TokenValue value={newBudget} />.
    </>
  )
})
