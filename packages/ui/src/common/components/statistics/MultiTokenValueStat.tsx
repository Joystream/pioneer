import BN from 'bn.js'
import React from 'react'

import { TextSmall } from '../typography'

import { StatisticItem, StatisticItemProps } from './StatisticItem'
import { TotalValue } from './TokenValueStat'

type LabelledValue = { label: string; value: BN }

interface MultiTokenValueStatProps extends StatisticItemProps {
  values: LabelledValue[]
}

export const MultiTokenValueStat = ({ title, values }: MultiTokenValueStatProps) => (
  <StatisticItem title={title}>
    {values.map(({ label, value }) => (
      <TextSmall>
        {label}
        <TotalValue value={value} />
      </TextSmall>
    ))}
  </StatisticItem>
)
