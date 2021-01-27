import React from 'react'
import BN from 'bn.js'
import styled from 'styled-components'
import { Colors } from '../constants'
import { formatTokenValue } from '../utils/formatters'

interface props {
  value: BN | number | undefined
}

export const TokenValue = React.memo(({ value }: props) => (
  <TokenValueWrap>
    {formatTokenValue(value)}&nbsp;<TokenSymbol>JOY</TokenSymbol>
  </TokenValueWrap>
))

const TokenValueWrap = styled.span`
  font-weight: 700;
`

const TokenSymbol = styled.span`
  color: ${Colors.Black['400']};
  font-weight: normal;
`
