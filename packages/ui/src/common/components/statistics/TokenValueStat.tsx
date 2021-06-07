import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'

import { TokenValue } from '../typography'

import { StatisticItem, StatisticItemProps } from './StatisticItem'

export interface TokenValueStatProps extends StatisticItemProps {
  value?: number | BN | null
  textColor?: string
}

export const TokenValueStat = (props: TokenValueStatProps) => {
  return (
    <StatisticItem {...props}>
      <TotalValue value={props.value} textColor={props.textColor} />
      {props.children}
    </StatisticItem>
  )
}

export const TotalValue = styled(TokenValue)<{ textColor?: string }>`
  font-size: 20px;
  line-height: 28px;
  color: ${(props) => props.textColor || Colors.Black[900]};
`
