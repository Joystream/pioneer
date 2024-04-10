import React, { FC } from 'react'
import styled from 'styled-components'

import { Colors, Fonts } from '@/common/constants'
import { formatTokenValue } from '@/common/model/formatters'
import { isDefined } from '@/common/utils'

import { StatisticItem, StatisticItemProps } from './StatisticItem'

export interface NumericValueStatProps extends StatisticItemProps {
  value: Parameters<typeof formatTokenValue>[0]
}

export const NumericValueStat: FC<NumericValueStatProps> = (props) => {
  const value = typeof props.value === 'number' ? props.value.toString() : props.value

  if (!isDefined(value)) {
    return (
      <StatisticItem {...props}>
        <span>-</span>
      </StatisticItem>
    )
  }

  return (
    <StatisticItem {...props}>
      <NumericValue>{formatTokenValue(value)}</NumericValue>
      {props.children}
    </StatisticItem>
  )
}

export const NumericValue = styled.span`
  display: inline-grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: baseline;
  width: fit-content;
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  font-family: ${Fonts.Grotesk};
  color: ${Colors.Black[900]};
`
