import React from 'react'
import styled from 'styled-components'

import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Label } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface StatisticHeaderProps {
  title?: string
  tooltipText?: string
  tooltipTitle?: string
  tooltipLinkText?: React.ReactNode
  tooltipLinkURL?: string
  TooltipIcon?: React.ElementType
  counter?: number
}

export const StatisticHeader = ({
  title,
  tooltipText,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
  counter,
  TooltipIcon = TooltipDefault,
}: StatisticHeaderProps) => (
  <StatsHeader>
    <StatsInfo>
      {title}
      {tooltipText && (
        <Tooltip
          tooltipText={tooltipText}
          tooltipTitle={tooltipTitle}
          tooltipLinkText={tooltipLinkText}
          tooltipLinkURL={tooltipLinkURL}
        >
          {' '}
          <TooltipIcon />
        </Tooltip>
      )}
      {counter && <Counter>{counter}</Counter>}
    </StatsInfo>
  </StatsHeader>
)

const StatsHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 100%;
  justify-content: space-between;
  align-items: start;
`

const StatsInfo = styled(Label)`
  position: relative;
  align-items: start;
`

const Counter = styled.div`
  position: relative;
  background-color: ${Colors.Blue[50]};
  color: ${Colors.Blue[500]};
  width: 16px;
  height: 16px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`
