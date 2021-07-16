import React, { FC } from 'react'
import styled from 'styled-components'

import { TextSmall } from '@/common/components/typography'
import { spacing } from '@/common/utils/styles'

import { BorderRad, Colors, Shadows } from '../../constants'

import { StatisticHeader, StatisticHeaderProps } from './StatisticHeader'

export interface StatisticItemProps extends StatisticHeaderProps {
  className?: string
}

export const StatisticItem: FC<StatisticItemProps> = ({ className, children, ...headerProps }) => (
  <StatsBlock key={headerProps.title} className={className}>
    <StatisticHeader {...headerProps} />
    <StatsContent>{children}</StatsContent>
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

export const StatsContent = styled.div`
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
  grid-column-gap: ${spacing(2)};
  height: 100%;
`

export const TwoRowStatistic = styled(StatsBlock)`
  grid-template-rows: auto auto;
  height: auto;
  padding: ${spacing(2)};

  ${StatsContent} {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    & + * {
      margin-top: ${spacing(2)};
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
