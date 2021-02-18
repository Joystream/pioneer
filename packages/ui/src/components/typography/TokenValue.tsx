import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'
import { Colors, Fonts } from '../../constants'
import { formatTokenValue } from '../../utils/formatters'

interface Props {
  value: BN | number | undefined
  className?: string
}

export const TokenValue = React.memo(({ className, value }: Props) => {
  return value ? <ValueInJoys className={className}>{formatTokenValue(value)}</ValueInJoys> : <span>-</span>
})

export const ValueInJoys = styled.span`
  display: inline-grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: baseline;
  width: fit-content;
  font-weight: 700;
  color: ${Colors.Black[900]};
  font-family: ${Fonts.Title};

  &:after {
    content: 'JOY';
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: ${Colors.Black[400]};
    text-transform: uppercase;
    font-family: ${Fonts.Title};
  }
`

export const ValueInJoysInText = styled(ValueInJoys)`
  font-family: ${Fonts.Body};
  font-weight: 700;
  color: ${Colors.Black[700]};
  &:after {
    font-family: ${Fonts.Body};
    font-weight: 700;
    color: ${Colors.Black[700]};
  }
`
