import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Shadows } from '../../constants'
import { Help } from '../Help'
import { Label, TokenValue } from '../typography'

export interface StatisticItemProps {
  title?: string
  helperText?: string
  className?: string
  children?: React.ReactNode
  helperTitle?: string
  helperLinkText?: React.ReactNode
  helperLinkURL?: string
}

export interface TokenValueStatProps extends StatisticItemProps {
  value: number | BN
}

export const TokenValueStat = (props: TokenValueStatProps) => {
  return (
    <StatisticItem {...props}>
      <TotalValue value={props.value} />
      {props.children}
    </StatisticItem>
  )
}

const StatisticItem = ({
  title,
  helperText,
  className,
  children,
  helperTitle,
  helperLinkText,
  helperLinkURL,
}: StatisticItemProps) => {
  return (
    <StatsItem key={title} className={className}>
      <StatsHeader>
        <StatsInfo>
          {title}
          {helperText && (
            <Help
              helperText={helperText}
              helperTitle={helperTitle}
              helperLinkText={helperLinkText}
              helperLinkURL={helperLinkURL}
            />
          )}
        </StatsInfo>
      </StatsHeader>
      <StatsContent>{children}</StatsContent>
    </StatsItem>
  )
}

const TotalValue = styled(TokenValue)`
  font-size: 20px;
  line-height: 28px;
`

const StatsItem = styled.li`
  display: inline-grid;
  position: relative;
  grid-template-columns: 1fr;
  grid-template-rows: 16px 28px;
  align-content: space-between;
  flex-basis: 240px;
  flex-grow: 1;
  height: 100px;
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
