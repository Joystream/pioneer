import React from 'react'
import styled from 'styled-components'

import { ProgressBar } from '@/common/components/Progress'
import { Colors } from '@/common/constants'

export interface ProgressBarWithRangeProps {
  value: number
  minRange?: number
  maxRange: number
  size?: 'small' | 'big' | 'medium'
}

export interface ThresholdBarProps {
  current: number
  threshold: number
}

export const ProgressBarWithRange = React.memo(
  ({ size, value, minRange: minimum, maxRange }: ProgressBarWithRangeProps) => {
    const minRange = minimum ?? maxRange
    const color = value < minRange ? Colors.Orange[300] : Colors.Blue[500]
    // convert data to fractions:
    const current = value / maxRange
    const threshold = minRange / maxRange

    return (
      <ThresholdBar current={current} threshold={threshold}>
        <ProgressBar size={size} end={current} color={color} backgroundColor={Colors.Black[75]} />
      </ThresholdBar>
    )
  }
)

const ThresholdBar = styled.div<ThresholdBarProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: min-content;

  &::after {
    background-color: ${Colors.Black[200]};
    content: '';
    display: block;
    position: absolute;
    height: 100%;
    left: ${({ current }) => `${current * 100}%`};
    width: ${({ threshold, current }) => `${(threshold - current) * 100}%`};
  }
`
