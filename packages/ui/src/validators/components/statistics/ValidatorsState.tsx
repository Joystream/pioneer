import React from 'react'

import { NumericValue, StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'

interface ValidatorsStateProps {
  activeValidatorsCount: number
  allValidatorsCount: number
  activeNominatorsCount: number
  allNominatorsCount: number
}

export const ValidatorsState = ({
  activeValidatorsCount,
  allValidatorsCount,
  activeNominatorsCount,
  allNominatorsCount,
}: ValidatorsStateProps) => {
  return (
    <StatisticItem title="validators and Nominators">
      <StatisticItemSpacedContent>
        <StatisticLabel>Validator (Active / Waiting)</StatisticLabel>
        <NumericValue>
          {`${activeValidatorsCount > 0 ? activeValidatorsCount : '-'} / ${
            allValidatorsCount && activeValidatorsCount ? allValidatorsCount - activeValidatorsCount : '-'
          }`}
        </NumericValue>
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel>Nominator (Active / Total)</StatisticLabel>
        <NumericValue>
          {`${activeNominatorsCount > 0 ? activeNominatorsCount : '-'} / ${
            activeNominatorsCount && allNominatorsCount ? allNominatorsCount : '-'
          }`}
        </NumericValue>
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}
