import React from 'react'

import { NumericValue, StatisticItem, StatisticItemSpacedContent, StatisticLabel } from '@/common/components/statistics'

interface ValidatorsStateProps {
  activeValidatorsCount: number
  allValidatorsCount: number
  acitveNominatorsCount: number
  allNominatorsCount: number
}

export const ValidatorsState = ({
  activeValidatorsCount,
  allValidatorsCount,
  acitveNominatorsCount,
  allNominatorsCount,
}: ValidatorsStateProps) => {
  return (
    <StatisticItem
      title="validators and Nominators"
      tooltipText="tooltip text..."
      tooltipTitle="Validators State"
      tooltipLinkText="link..."
      tooltipLinkURL="#"
    >
      <StatisticItemSpacedContent>
        <StatisticLabel>Validator (Active / Waiting)</StatisticLabel>
        <NumericValue>
          {activeValidatorsCount} / {allValidatorsCount - activeValidatorsCount}
        </NumericValue>
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <StatisticLabel>Nominator (Active / Total)</StatisticLabel>
        <NumericValue>
          {acitveNominatorsCount} / {allNominatorsCount}
        </NumericValue>
      </StatisticItemSpacedContent>
    </StatisticItem>
  )
}
