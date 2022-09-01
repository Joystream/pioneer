import React, { FC } from 'react'
import styled, { css } from 'styled-components'

import { TextSmall } from '@/common/components/typography'

import { BorderRad, Colors, Shadows } from '../../constants'
import { ColumnGapBlock } from '../page/PageContent'

import { StatisticHeader, StatisticHeaderProps } from './StatisticHeader'

export interface StatisticItemProps extends StatisticHeaderProps, StatiscticBlockProps {
  className?: string
  counter?: number
  inline?: boolean
}

export const StatisticItem: FC<StatisticItemProps> = ({ className, size, children, centered, ...headerProps }) => (
  <StatsBlock key={headerProps.title} className={className} size={size} centered={centered}>
    <StatisticHeader {...headerProps} />
    <StatsContent inline={headerProps.inline}>{children}</StatsContent>
  </StatsBlock>
)

export interface StatiscticBlockProps {
  size?: 's' | 'm' | 'l'
  centered?: boolean
}

export const StatsBlock = styled.div<StatiscticBlockProps>`
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
`

export const StatsContent = styled.div<{ inline?: boolean }>`
  margin-top: auto;
  ${({ inline }) =>
    inline &&
    css`
      display: flex;
      justify-content: space-between;
    `}
`

export const StatisticItemSpacedContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const StatisticItemContentGrid = styled(ColumnGapBlock).attrs(() => ({
  align: 'center',
  gap: 4,
}))`
  color: inherit;

  & svg {
    transform: translateY(-2px);
  }
`

export const StatisticLabel = styled(TextSmall)`
  color: ${Colors.Black[500]};
`

export const MultiColumnsStatistic = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 16px;
  width: fit-content;
  height: 100%;
`

export const TwoRowStatistic = styled(StatsBlock)`
  grid-template-rows: auto auto;
  height: auto;
  padding: 16px;

  ${StatsContent} {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    & + * {
      margin-top: 16px;
    }
  }
`

export const StatiscticContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StatiscticSpaceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
