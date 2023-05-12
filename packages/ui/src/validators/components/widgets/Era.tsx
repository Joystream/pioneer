import React, { useMemo } from 'react'

import {
  StatisticItem,
  StatisticItemSpacedContent,
  StatisticLabel,
  formatDurationDate,
} from '@/common/components/statistics'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { PercentageChart } from '@/common/components/charts/PercentageChart'
import { useStakingStatistics } from '@/validators/hooks/useStakingStatistics'
export const Era = () => {
  const { eraStartedOn, eraDuration, now } = useStakingStatistics()
  const { nextReward, totalDuration, percentage } = useMemo(() => {
    const nextReward =
      eraDuration && now && eraStartedOn ? eraDuration - (now.toNumber() - Number(eraStartedOn)) : undefined
    const totalDuration = eraDuration
    const percentage = nextReward ? Math.floor(100-(nextReward / totalDuration) * 100) : 0
    console.log(now?.toNumber())
    return {
      nextReward:formatDurationDate(nextReward??0),
      totalDuration:formatDurationDate(totalDuration??0),
      percentage,
    }
  }, [eraStartedOn, eraDuration, now])
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
        <div>
          <DurationValue value={nextReward} />
        </div>
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> Total duration </StatisticLabel>
        <div>
          <DurationValue value={totalDuration} />
        </div>
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}
