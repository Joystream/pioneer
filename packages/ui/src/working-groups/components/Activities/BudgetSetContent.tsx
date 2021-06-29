import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'

import { BudgetSetActivity } from '../../types'

export const BudgetSetContent: ActivityContentComponent = React.memo(({ activity }) => {
  const { groupName, newBudget } = activity as BudgetSetActivity
  return (
    <>
      {groupName} Working Group Lead has changed the group budget to <TokenValue value={newBudget} />.
    </>
  )
})
