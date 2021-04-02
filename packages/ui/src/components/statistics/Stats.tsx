import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'
import { Help } from '../../components/Help'
import { Label, TokenValue } from '../../components/typography'
import { BorderRad, Colors, Shadows } from '../../constants'

interface StatisticItemProps {
  title?: string
  helperText?: string
  value: number | BN
  className?: string
  children?: React.ReactElement
}

export const StatisticItem = ({ title, helperText, value, className, children }: StatisticItemProps) => {
  return (
    <StatsItem key={title} className={className}>
      <StatsHeader>
        <StatsInfo>
          {title}
          {helperText && <Help helperText={helperText} />}
        </StatsInfo>
      </StatsHeader>
      <StatsContent>
        <TotalValue value={value} />
        {children}
      </StatsContent>
    </StatsItem>
  )
}

interface StatisticsProps {
  stats: Array<StatisticItemProps>
}

export const Statistics = ({ stats }: StatisticsProps) => {
  return (
    <Stats>
      {stats.map(({ title, helperText, value, className }) => (
        <StatisticItem title={title} helperText={helperText} value={value} className={className} />
      ))}
    </Stats>
  )
}

const TotalValue = styled(TokenValue)`
  font-size: 20px;
  line-height: 28px;
`

const Stats = styled.ul`
  display: flex;
  width: 100%;
  justify-items: flex-start;
`

const StatsItem = styled.li`
  display: inline-grid;
  position: relative;
  grid-template-columns: 1fr;
  grid-template-rows: 16px 28px;
  grid-row-gap: 24px;
  flex-basis: 240px;
  flex-grow: 1;
  height: clamp(100%, 100px, 100px);
  padding: 12px 16px 20px;
  border-radius: ${BorderRad.m};
  background-color: ${Colors.White};
  box-shadow: ${Shadows.light};

  & + & {
    margin-left: 24px;
  }

  &.statsItemWide {
    flex-basis: 302px;
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
`

const StatsContent = styled.div`
  margin-top: auto;
`
