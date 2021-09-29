import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { TextInlineBig, TextBig } from '@/common/components/typography'
import { Fonts } from '@/common/constants'
import { plural } from '@/common/helpers'
import { formatNumber } from '@/common/model/formatters'
import { toNumber } from '@/common/utils'

import { StatisticItem, StatisticItemProps, StatisticItemSpacedContent, StatisticLabel } from './StatisticItem'
import { TotalValue } from './TokenValueStat'

interface LabelledValue {
  label: string
  type?: 'token' | 'blocks'
  value?: BN | number | null
}

interface MultiTokenValueStatProps extends StatisticItemProps {
  values: LabelledValue[]
}

export const MultiValueStat = ({ title, values }: MultiTokenValueStatProps) => (
  <MultiStatisticItem title={title}>
    {values.map(({ label, value, type = 'token' }) => (
      <StatisticItemSpacedContent key={label}>
        <StatisticLabel>{label}</StatisticLabel>
        <StatisticValue type={type} value={value} />
      </StatisticItemSpacedContent>
    ))}
  </MultiStatisticItem>
)

const StatisticValue = ({ type, value }: Omit<LabelledValue, 'label'>) => {
  switch (type) {
    case 'blocks': {
      const blocks = toNumber(value)
      return (
        <BlocksValue>
          {formatNumber(blocks)} <TextInlineBig lighter>block{plural(blocks)}</TextInlineBig>
        </BlocksValue>
      )
    }

    case 'token':
    default:
      return <TotalValue value={value} />
  }
}

export const MultiStatisticItem = styled(StatisticItem)`
  padding: 12px 16px 4px;
`

const BlocksValue = styled(TextBig)`
  font-family: ${Fonts.Grotesk};
`
