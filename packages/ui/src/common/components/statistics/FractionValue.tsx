import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { Colors } from '@/common/constants'

import { NumericValue } from './NumericValueStat'

export interface FractionValueProps {
  numerator: ReactNode | number
  denominator: ReactNode | number
}

export const FractionValue = ({ numerator, denominator }: FractionValueProps) => (
  <NumericValue>
    {numerator}
    <DenominatorValue>/ {denominator}</DenominatorValue>
  </NumericValue>
)

const DenominatorValue = styled.span`
  color: ${Colors.Black[400]};
  font-size: 14px;
  font-weight: 400;
`
