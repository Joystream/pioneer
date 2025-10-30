import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Transitions } from '../../constants'
import { TextInlineSmall } from '../typography'

export interface PercentageChartProps {
  percentage: number
  isOnBlack?: boolean
  className?: string
  small?: boolean
}

export const PercentageChart = ({ percentage, className, isOnBlack, small }: PercentageChartProps) => {
  const innerPercentage = percentage <= 0 ? 0 : percentage
  return (
    <PercentageChartContainer className={className} isOnBlack={isOnBlack} small={small}>
      <PercentageChartBorder>
        <PercentageChartText small={small}>{Math.min(innerPercentage, 100)}%</PercentageChartText>
        <PercentageChartSvg viewBox="0 0 34 34" fill="none" color="currentColor">
          <PercentageChartCircle cx="17" cy="17" r="16" percentage={Math.min(innerPercentage, 100)} />
        </PercentageChartSvg>
      </PercentageChartBorder>
    </PercentageChartContainer>
  )
}

const PercentageChartContainer = styled.div<{ isOnBlack?: boolean; small?: boolean }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: ${({ small }) => (small ? '24px' : '44px')};
  height: ${({ small }) => (small ? '24px' : '44px')};
  padding: 1px;
  color: ${({ isOnBlack }) => (isOnBlack ? Colors.White : Colors.Black[900])};
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

const PercentageChartText = styled(TextInlineSmall)<{ small?: boolean }>`
  ${({ small }) => (small ? 'font-size:9px;' : '')}
  color: inherit;
  font-weight: 700;
  text-align: center;
  transform: translateY(1px);
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
  stroke: ${({ percentage }) => (percentage <= 0 ? 'transparent' : Colors.Blue[500])};
  stroke-width: 2;
  transition: ${Transitions.all};
`
