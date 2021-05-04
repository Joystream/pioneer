import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'
import { TextInlineSmall } from '../typography'

export interface PercentageChartProps {
  percentage: number
  isOnBlack?: boolean
  className?: string
}

export const PercentageChart = ({ percentage, className, isOnBlack }: PercentageChartProps) => {
  return (
    <PercentageChartContainer className={className} onBlack={isOnBlack}>
      <PercentageChartBorder>
        <PercentageChartText value>{Math.min(percentage, 100)}%</PercentageChartText>
        <PercentageChartSvg viewBox="0 0 34 34" fill="none" color="currentColor">
          <PercentageChartCircle cx="17" cy="17" r="16" percentage={Math.min(percentage, 100)} />
        </PercentageChartSvg>
      </PercentageChartBorder>
    </PercentageChartContainer>
  )
}

const PercentageChartContainer = styled.div<{ onBlack?: boolean }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  padding: 1px;
  color: ${({ onBlack }) => (onBlack ? Colors.White : Colors.Black[900])};
  overflow: hidden;
`

const PercentageChartBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid ${Colors.Blue[200]};
  border-radius: ${BorderRad.round};
`

const PercentageChartText = styled(TextInlineSmall)`
  color: inherit;
  font-weight: 700;
  text-align: center;
  transition: ${Transitions.all};
`

const PercentageChartSvg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
  transform: rotate(-90deg);
  transition: ${Transitions.all};
`

const PercentageChartCircle = styled.circle<{ percentage: number }>`
  stroke-dasharray: 100;
  stroke-dashoffset: ${({ percentage }) => `${100 - percentage}`};
  stroke-linecap: round;
  stroke: ${Colors.Blue[500]};
  stroke-width: 2;
  transition: ${Transitions.all};
`
