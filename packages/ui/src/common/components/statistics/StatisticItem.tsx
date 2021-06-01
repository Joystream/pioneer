import React, { JSXElementConstructor } from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Shadows } from '../../constants'
import { Tooltip, TooltipDefault } from '../Tooltip'
import { Label, TextSmall } from '../typography'

export interface StatisticItemProps {
  title?: string
  tooltipText?: string
  className?: string
  children?: React.ReactNode
  tooltipTitle?: string
  tooltipLinkText?: React.ReactNode
  tooltipLinkURL?: string
  TooltipIcon?: React.ElementType
}

export const StatisticItem = ({
  title,
  tooltipText,
  className,
  children,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
  TooltipIcon = TooltipDefault,
}: StatisticItemProps) => {
  return (
    <StatsBlock key={title} className={className}>
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
      <StatsContent>{children}</StatsContent>
    </StatsBlock>
  )
}

interface StatiscticBlockProps {
  size?: 's' | 'm' | 'l'
  centered?: boolean
  spacing?: 's' | 'm'
}

export const StatsBlock = styled.li<StatiscticBlockProps>`
  display: grid;
  position: relative;
  align-content: ${({ centered }) => (centered ? 'stretch' : 'space-between')};
  ${({ centered }) => (centered ? 'align-items: center;' : null)};
  flex-basis: 240px;
  flex-grow: 1;
  height: ${({ size }) => {
    switch (size) {
      case 's':
        return 'auto'
      case 'm':
        return '88px'
      case 'l':
      default:
        return '100px'
    }
  }};
  padding: ${({ centered }) => (centered ? '20px 16px' : '12px 16px 20px')};
  border-radius: ${BorderRad.m};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.light};

  & + & {
    margin-left: ${({ spacing }) => {
      switch (spacing) {
        case 's':
          return '16px'
        case 'm':
        default:
          return '24px'
      }
    }};
  }
`

const StatsHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 100%;
  justify-content: space-between;
  align-items: start;
`

const StatsInfo = styled(Label)`
  position: relative;
  align-items: center;
`

const StatsContent = styled.div`
  margin-top: auto;
`

export const StatisticItemSpacedContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const StatisticLabel = styled(TextSmall)`
  color: ${Colors.Black[500]};
`

export const TwoColumnsStatistic = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 16px;
  height: 100%;
`

export const StatiscticContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
