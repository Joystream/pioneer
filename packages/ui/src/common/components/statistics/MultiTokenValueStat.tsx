import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { StatisticItem, StatisticItemProps, StatisticItemSpacedContent, StatisticLabel } from './StatisticItem'
import { TotalValue } from './TokenValueStat'

interface LabelledValue {
  label: string
  value?: BN | number | null
}

interface MultiTokenValueStatProps extends StatisticItemProps {
  values: LabelledValue[]
}

export const MultiTokenValueStat = ({ title, values }: MultiTokenValueStatProps) => (
  <MultiStatisticItem title={title}>
    {values.map(({ label, value }) => (
      <StatisticItemSpacedContent key={label}>
        <StatisticLabel>{label}</StatisticLabel>
        <TotalValue value={value} />
      </StatisticItemSpacedContent>
    ))}
  </MultiStatisticItem>
)

export const MultiStatisticItem = styled(StatisticItem)`
  padding: 12px 16px 4px;
`
