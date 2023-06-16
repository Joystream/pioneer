import React, { useMemo } from 'react'

import { NumericValue, StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'
import { useStakingStatistics } from '@/validators/hooks/useStakingStatistics'

export const ValidatorsState = () => {
  const { activeValidatorsCount, allValidatorsCount, acitveNominatorsCount, allNominatorsCount } = useStakingStatistics()
  return (
    <StatisticItem
      title="validators and Nominators"
      tooltipText="tooltip text..."
      tooltipTitle="Validators State"
      tooltipLinkText="link..."
      tooltipLinkURL="#"
    >
      <StatisticItemSpacedContent>
        <StatisticLabel> {"Validator(Active/Waiting)"} </StatisticLabel>
        <NumericValue>{`${activeValidatorsCount}/${allValidatorsCount-activeValidatorsCount}`}</NumericValue>
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel> {"Nominator(Active/Total)"} </StatisticLabel>
        <NumericValue>{`${acitveNominatorsCount}/${allNominatorsCount}`}</NumericValue>
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}
