import { Option, u64 } from '@polkadot/types'
import { PalletStakingEraRewardPoints } from '@polkadot/types/lookup'
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
import { whenDefined } from '@/common/utils'

interface EraProps {
  eraStartedOn: Option<u64> | undefined
  eraRewardPoints: PalletStakingEraRewardPoints | undefined
}

export const Era = ({ eraStartedOn, eraRewardPoints }: EraProps) => {
  const [spentDuration, setSpentDuration] = useState<number>()

  const { nextReward, percentage } = useMemo(
    () => ({
      nextReward: whenDefined(spentDuration, (d) => ERA_DURATION - d),
      percentage: spentDuration && Math.ceil((100 * ERA_DURATION) / spentDuration),
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
      tooltipLinkURL="TBD"
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
