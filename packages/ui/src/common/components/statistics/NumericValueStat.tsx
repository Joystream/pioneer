import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { Colors, Fonts } from '@/common/constants'

import { StatisticItem, StatisticItemProps } from './StatisticItem'

export interface TokenValueStatProps extends StatisticItemProps {
  value: number | BN | string
}

export const NumericValueStat = (props: TokenValueStatProps) => {
  return (
    <StatisticItem {...props}>
      <NumericValue>{props.value}</NumericValue>
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
