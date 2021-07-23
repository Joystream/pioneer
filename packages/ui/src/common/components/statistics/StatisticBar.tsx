import React from 'react'
import styled, { css } from 'styled-components'

import { ProgressBar } from '@/common/components/Progress'
import { Colors } from '@/common/constants'

import { StatsContent, StatisticHeader, StatisticHeaderProps } from '.'
import { FractionValue, FractionValueProps } from './FractionValue'
import { NumericValue } from './NumericValueStat'

export interface StatisticBarProps extends StatisticHeaderProps, FractionValueProps {
  value: number
  threshold?: number
}

export const StatisticBar = ({ value, threshold, numerator, denominator, ...headerProps }: StatisticBarProps) => (
  <>
    <StatisticHeader {...headerProps} />

    <StatsContent>
      <ThresholdBar threshold={threshold}>
        <ProgressBar end={value} />
      </ThresholdBar>

      <Figure>
        <FractionValue numerator={numerator} denominator={denominator} />
      </Figure>
    </StatsContent>
  </>
)

const ThresholdBar = styled.div<{ threshold?: number }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 223px;

  ${({ threshold }) =>
    threshold &&
    css`
      &::after {
        border-right: solid 2px ${Colors.Black[900]};
        content: '';
        display: block;
        position: absolute;
        height: 14px;
        left: calc(${threshold * 100}% - 1px);
      }
    `};
`

const Figure = styled.div`
  margin-left: auto;

  ${NumericValue} {
    font-size: 14px;
  }
`
