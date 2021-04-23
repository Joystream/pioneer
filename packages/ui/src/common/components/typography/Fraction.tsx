import React from 'react'
import styled, { css } from 'styled-components'

import { Colors } from '../../constants'

import { TextInlineMedium } from './Text'

interface FractionProps {
  num: string | number
  den: string | number
  className?: string
  sameSize?: boolean
}

export const Fraction = React.memo(({ num, den, className, sameSize }: FractionProps) => {
  return (
    <FractionBlock className={className} sameSize={sameSize} lighter value>
      <FractionNumerator>{num ? num : 0}</FractionNumerator>
      {!sameSize && <span> </span>}/{!sameSize && <span> </span>}
      <FractionDenominator>{den ? den : 0}</FractionDenominator>
    </FractionBlock>
  )
})

const FractionNumerator = styled.span`
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  color: ${Colors.Black[900]};
`

const FractionDenominator = styled.span`
  font-size: inherit;
  line-height: inherit;
  color: inherit;
`

const FractionBlock = styled(TextInlineMedium)<{ sameSize?: boolean }>`
  ${({ sameSize }) =>
    sameSize &&
    css`
      &,
      & ${FractionNumerator} {
        font-size: 16px;
        line-height: 24px;
      }
    `};
`
