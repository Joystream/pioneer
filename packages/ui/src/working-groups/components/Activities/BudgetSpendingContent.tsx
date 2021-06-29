import React from 'react'

import { ActivityContentProps } from '@/common/components/Activities/ActivityContent'
import { TokenValue } from '@/common/components/typography'

import { BudgetSpendingActivity } from '../../types'

export const BudgetSpendingContent: React.FC<ActivityContentProps> = React.memo(({ activity }) => {
  const { groupName, amount } = activity as BudgetSpendingActivity
  return (
    <>
      {groupName} Lead spent <TokenValue value={amount} /> from the budget.
    </>
  )
})
