import React from 'react'

import { ActivityContentComponent } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'

import { BudgetSpendingActivity } from '../../types'

export const BudgetSpendingContent: ActivityContentComponent<BudgetSpendingActivity> = React.memo(({ activity }) => {
  const { groupName, amount } = activity

  return (
    <>
      {groupName} Lead spent <TokenValue value={amount} /> from the budget.
    </>
  )
})
