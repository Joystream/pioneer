import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'

import { NumericValue } from './NumericValueStat'

export interface FractionValueProps {
  numerator: ReactNode | number
  denominator: ReactNode | number
}

export const FractionValue = ({ numerator, denominator }: FractionValueProps) => (
  <Fraction>
    {numerator}
    <DenominatorValue>/ {denominator}</DenominatorValue>
  </Fraction>
)

const Fraction = styled(NumericValue)`
  font-size: 16px;
`

const DenominatorValue = styled.span`
  color: ${Colors.Black[400]};
  font-weight: 400;
`
