import React from 'react'
import styled from 'styled-components'

import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Label } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface StatisticHeaderProps {
  title?: string
  tooltipText?: React.ReactNode
  tooltipTitle?: string
  tooltipLinkText?: React.ReactNode
  tooltipLinkURL?: string
  TooltipIcon?: React.ElementType
  counter?: number
  dotElement?: React.ReactNode
  actionElement?: React.ReactNode
}

export const StatisticHeader = ({
  title,
  tooltipText,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
  counter,
  dotElement,
  actionElement,
  TooltipIcon = TooltipDefault,
}: StatisticHeaderProps) => (
  <StatsHeader>
    <StatsInfo>
      {dotElement}
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
    {actionElement ?? null}
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
