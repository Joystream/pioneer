import BN from 'bn.js'
import React from 'react'

import { TextSmall } from '../typography'

import { StatisticItem } from './StatisticItem'
import { TotalValue } from './TokenValueStat'

type LabelledValue = { label: string; value: BN }

interface MultiTokenValueStatProps {
  values: LabelledValue[]
}

export const MultiTokenValueStat = ({ values }: MultiTokenValueStatProps) => (
  <StatisticItem title="Earned in past">
    {values.map(({ label, value }) => (
      <TextSmall>
        {label}
        <TotalValue value={value} />
      </TextSmall>
    ))}
  </StatisticItem>
)
