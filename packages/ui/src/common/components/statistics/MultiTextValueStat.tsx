import React from 'react'
import styled from 'styled-components'

import { TextBig } from '@/common/components/typography'
import { Fonts } from '@/common/constants'

import { MultiStatisticItem } from './MultiValueStat'
import { StatisticItemProps, StatisticItemSpacedContent, StatisticLabel } from './StatisticItem'

interface LabelledTextValue {
  label: string
  value?: string | number
}

interface MultiTextValueStatProps extends StatisticItemProps {
  values: LabelledTextValue[]
  isTerminated?: boolean
}

export const MultiTextValueStat = ({ title, values, isTerminated, ...props }: MultiTextValueStatProps) => (
  <MultiStatisticItem title={title} isTerminated={isTerminated} {...props}>
    {values.map(({ label, value }) => (
      <StatisticItemSpacedContent key={label}>
        <StatisticLabel>{label}</StatisticLabel>
        <TextValue>{value ?? '-'}</TextValue>
      </StatisticItemSpacedContent>
    ))}
  </MultiStatisticItem>
)

const TextValue = styled(TextBig)`
  font-family: ${Fonts.Grotesk};
`
