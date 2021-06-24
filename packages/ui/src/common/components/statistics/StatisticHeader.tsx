import React from 'react'
import styled from 'styled-components'

import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Label } from '@/common/components/typography'

export interface StatisticHeaderProps {
  title?: string
  tooltipText?: string
  tooltipTitle?: string
  tooltipLinkText?: React.ReactNode
  tooltipLinkURL?: string
  TooltipIcon?: React.ElementType
}

export const StatisticHeader = ({
  title,
  tooltipText,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
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
          <TooltipIcon />
        </Tooltip>
      )}
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
