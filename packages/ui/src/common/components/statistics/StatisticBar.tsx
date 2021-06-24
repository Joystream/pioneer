import React from 'react'
import styled from 'styled-components'

import { ProgressBar } from '@/common/components/Progress'
import { Colors } from '@/common/constants'

import { StatsContent, StatisticHeader, StatisticHeaderProps } from '.'
import { FractionValue, FractionValueProps } from './FractionValue'

export interface StatisticBarProps extends StatisticHeaderProps, FractionValueProps {
  value: number
  threshold: number
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

const ThresholdBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 223px;

  &::after {
    border-right: solid 2px ${Colors.Black[900]};
    content: '';
    display: block;
    position: absolute;
    height: 14px;
    left: ${({ threshold }: { threshold: number }) => `calc(${threshold * 100}% - 1px)`};
  }
`

const Figure = styled.div`
  margin-left: auto;
`
