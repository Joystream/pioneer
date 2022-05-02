import BN from 'bn.js'
import React, { FC } from 'react'
import styled from 'styled-components'

import { Skeleton } from '@/common/components/Skeleton'
import { Colors } from '@/common/constants'

import { TokenValue } from '../typography'

import { StatisticItem, StatisticItemProps } from './StatisticItem'

export interface TokenValueStatProps extends StatisticItemProps {
  value?: number | BN | null
  textColor?: string
  isLoading?: boolean
}

export const TokenValueStat: FC<TokenValueStatProps> = (props) => {
  return (
    <StatisticItem {...props}>
      {!props.isLoading ? (
        <TotalValue value={props.value} textColor={props.textColor} />
      ) : (
        <Skeleton variant="rect" height="32px" width="50%" />
      )}
      {props.children}
    </StatisticItem>
  )
}

export const TotalValue = styled(TokenValue)<{ textColor?: string }>`
  font-size: 20px;
  line-height: 28px;
  color: ${(props) => props.textColor || Colors.Black[900]};
`
