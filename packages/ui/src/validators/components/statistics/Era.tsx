import React, { useMemo } from 'react'

import { PercentageChart } from '@/common/components/charts/PercentageChart'
import { BlockIcon } from '@/common/components/icons'
import {
  NumericValue,
  StatisticItem,
  StatisticItemSpacedContent,
  StatisticLabel,
  formatDurationDate,
} from '@/common/components/statistics'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { useStakingStatistics } from '@/validators/hooks/useStakingStatistics'
export const Era = () => {
  const { eraStartedOn, eraDuration, now, eraRewardPoints } = useStakingStatistics()
  const { nextReward, percentage } = useMemo(() => {
    const nextReward =
      eraDuration && now && eraStartedOn ? Number(eraDuration) - (now.toNumber() - Number(eraStartedOn)) : undefined
    const totalDuration = Number(eraDuration)
    const percentage = nextReward ? Math.floor(100 - (nextReward / totalDuration) * 100) : 0
    return {
      nextReward: formatDurationDate(nextReward ?? 0),
      totalDuration: formatDurationDate(totalDuration ?? 0),
      percentage,
    }
  }, [eraStartedOn, eraDuration, now])
  return (
    <StatisticItem
      title="era"
      tooltipText="One era consists of 6 epochs with 1 hour duration each."
      tooltipTitle="Era"
      tooltipLinkText="What is an era"
      tooltipLinkURL="TBD"
      actionElement={<PercentageChart percentage={percentage} small />}
    >
      <StatisticItemSpacedContent>
        <StatisticLabel>Next Reward</StatisticLabel>
        <div>
          <DurationValue value={nextReward} />
        </div>
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel>Blocks / Points</StatisticLabel>
        <div>
          {eraRewardPoints && (
            <NumericValue>
              <BlockIcon />
              {eraRewardPoints.total.toNumber() / 20} / {eraRewardPoints?.total.toNumber()}
            </NumericValue>
          )}
        </div>
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}
