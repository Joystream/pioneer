import React, { useEffect, useMemo, useState } from 'react'

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
import { ERA_DURATION } from '@/common/constants'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { whenDefined } from '@/common/utils'

interface EraProps {
  eraStartedOn: number | undefined
}

const POINTS_PER_BLOCK = 20

export const Era = ({ eraStartedOn }: EraProps) => {
  const [spentDuration, setSpentDuration] = useState<number>()

  const { nextReward, percentage, blocks } = useMemo(
    () => ({
      nextReward: whenDefined(spentDuration, (d) => ERA_DURATION - d),
      percentage: spentDuration && Math.ceil((100 * spentDuration) / ERA_DURATION),
      blocks: spentDuration && Math.floor(spentDuration / MILLISECONDS_PER_BLOCK),
    }),
    [spentDuration]
  )

  useEffect(() => {
    if (!eraStartedOn) return
    const interval = setInterval(() => setSpentDuration(Math.max(0, Date.now() - Number(eraStartedOn))), 1000)
    return () => clearInterval(interval)
  }, [eraStartedOn])

  return (
    <StatisticItem
      title="era"
      tooltipText="One era consists of 6 epochs with 1 hour duration each."
      tooltipTitle="Era"
      tooltipLinkText="What is an era"
      actionElement={<PercentageChart percentage={percentage ?? 0} small />}
    >
      <StatisticItemSpacedContent>
        <StatisticLabel>Next Reward</StatisticLabel>
        <div>
          <DurationValue value={formatDurationDate(nextReward ?? 0)} />
        </div>
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel>Blocks / Points</StatisticLabel>
        <div>
          {blocks && (
            <NumericValue>
              <BlockIcon /> {blocks} / {blocks * POINTS_PER_BLOCK}
            </NumericValue>
          )}
        </div>
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}
