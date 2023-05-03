import React from 'react'

import {
  StatisticItem,
  StatisticItemSpacedContent,
  StatisticLabel,
  formatDurationDate,
} from '@/common/components/statistics'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { PercentageChart } from '@/common/components/charts/PercentageChart'

export const Era = () => {
  const { nextReward, totalDuration, percentage } = {
    nextReward: formatDurationDate(7860022),
    totalDuration: formatDurationDate(21990045),
    percentage:67
  }
  return (
    <StatisticItem
      title="era"
      tooltipText="tooltip text..."
      tooltipTitle="era tooltip title"
      tooltipLinkText="link..."
      tooltipLinkURL="#"
      actionElement={<PercentageChart percentage={percentage} small />}
    >
      <StatisticItemSpacedContent>
        <StatisticLabel> Next reward </StatisticLabel>
        <DurationValue value={nextReward} />
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> Total duration </StatisticLabel>
        <DurationValue value={totalDuration} />
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}
