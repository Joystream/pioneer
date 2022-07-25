import BN from 'bn.js'
import React, { FC } from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'

import { TokenValue } from '../typography'

import { StatisticItem, StatisticItemProps } from './StatisticItem'

export interface TokenValueStatProps extends StatisticItemProps {
  value?: BN | null
  isLoading?: boolean
  textColor?: string
}

export const TokenValueStat: FC<TokenValueStatProps> = (props) => {
  return (
    <StatisticItem {...props}>
      <TotalValue value={new BN(props.value ?? 0)} textColor={props.textColor} isLoading={props.isLoading} />
      {props.children}
    </StatisticItem>
  )
}

export const TotalValue = styled(TokenValue)<{ textColor?: string }>`
  font-size: 20px;
  line-height: 28px;
  color: ${(props) => props.textColor || Colors.Black[900]};
`
