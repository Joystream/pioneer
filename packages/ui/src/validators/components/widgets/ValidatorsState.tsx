import React from 'react'

import { NumericValue, StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'

export const ValidatorsState = () => {
  const { active, waiting } = {
    active: 200,
    waiting: 30,
  }
  return (
    <StatisticItem
      title="validators state"
      tooltipText="tooltip text..."
      tooltipTitle="Validators State"
      tooltipLinkText="link..."
      tooltipLinkURL="#"
    >
      <StatisticItemSpacedContent>
        <StatisticLabel> Active </StatisticLabel>
        <NumericValue>{active}</NumericValue>
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> Waiting </StatisticLabel>
        <NumericValue>{waiting}</NumericValue>
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}
