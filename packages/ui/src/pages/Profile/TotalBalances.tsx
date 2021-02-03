import React from 'react'
import styled from 'styled-components'
import { ButtonPrimarySmall } from '../../components/buttons/Buttons'
import { HelpNotification } from '../../components/notifications/HelpNotification'
import { Label } from '../../components/page/Typography/Label'
import { ValueInJoys } from '../../components/page/Typography/ValueInJoys'
import { BorderRad, Colors, Shadows } from '../../constants'
import { formatTokenValue } from '../../utils/formatters'

export const TotalBalances = () => (
  <Stats>
    <StatsItem>
      <StatsHeader>
        <StatsInfo>
          Total balance
          <HelpNotification helperText={'Lorem fishy'} />
        </StatsInfo>
      </StatsHeader>
      <StatsContent>
        <ValueInJoys>{formatTokenValue(0)}</ValueInJoys>
      </StatsContent>
    </StatsItem>
    <StatsItem>
      <StatsHeader>
        <StatsInfo>
          Total transferable balance
          <HelpNotification helperText={'Lorem fishy'} />
        </StatsInfo>
      </StatsHeader>
      <StatsContent>
        <ValueInJoys>{formatTokenValue(0)}</ValueInJoys>
      </StatsContent>
    </StatsItem>
    <StatsItem>
      <StatsHeader>
        <StatsInfo>
          Total locked balance
          <HelpNotification helperText={'Lorem fishy'} />
        </StatsInfo>
      </StatsHeader>
      <StatsContent>
        <ValueInJoys>{formatTokenValue(0)}</ValueInJoys>
      </StatsContent>
    </StatsItem>
    <StatsItem className={'statsItemWide'}>
      <StatsHeader>
        <StatsInfo>
          Total recoverable
          <HelpNotification helperText={'Lorem fishy'} />
        </StatsInfo>
        <StatsButton disabled={true}>Recover all</StatsButton>
      </StatsHeader>
      <StatsContent>
        <ValueInJoys>{formatTokenValue(0)}</ValueInJoys>
      </StatsContent>
    </StatsItem>
  </Stats>
)
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
  flex-grow: 0;
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
const StatsButton = styled(ButtonPrimarySmall)`
  position: absolute;
  top: 8px;
  right: 8px;
`
const StatsInfo = styled(Label)`
  position: relative;
`
const StatsContent = styled.div`
  margin-top: auto;
`
