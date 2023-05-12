import React, { useMemo } from 'react'

import { NumericValue, StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'
import { useStakingStatistics } from '@/validators/hooks/useStakingStatistics'

export const ValidatorsState = () => {
  const { activeValidatorsCount, allValidatorsCount } = useStakingStatistics()
  const { active, waiting } = useMemo(() => {
    const active = activeValidatorsCount?.toNumber()
    const all = allValidatorsCount?.toNumber()
    const waiting = all && active && all - active
    return {
      active,
      waiting,
    }
  }, [activeValidatorsCount, allValidatorsCount])
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
