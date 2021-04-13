import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { TokenValue } from '../typography'

import { StatisticItem, StatisticItemProps } from './StatisticItem'

export interface TokenValueStatProps extends StatisticItemProps {
  value: number | BN
}

export const TokenValueStat = (props: TokenValueStatProps) => {
  return (
    <StatisticItem {...props}>
      <TotalValue value={props.value} />
      {props.children}
    </StatisticItem>
  )
}

export const TotalValue = styled(TokenValue)`
  font-size: 20px;
  line-height: 28px;
`
