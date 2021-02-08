import React from 'react'
import styled from 'styled-components'
import BN from 'bn.js'
import { ButtonPrimarySmall } from '../../components/buttons/Buttons'
import { HelpNotification } from '../../components/notifications/HelpNotification'
import { Label } from '../../components/page/Typography/Label'
import { TokenValue } from '../../components/page/Typography/JoyValue'
import { BorderRad, Colors, Shadows } from '../../constants'
import { useTotalBalances } from '../../hooks/useTotalBalances'

export const TotalBalances = () => {
  const { total, transferable, locked, recoverable } = useTotalBalances()

  const hasRecoverable = recoverable.gt(new BN(0))

  return (
    <Stats>
      <StatsItem>
        <StatsHeader>
          <StatsInfo>
            Total balance
            <HelpNotification helperText={'Lorem fishy'} />
          </StatsInfo>
        </StatsHeader>
        <StatsContent>
          <TotalValue value={total} />
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
          <TotalValue value={transferable} />
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
          <TotalValue value={locked} />
        </StatsContent>
      </StatsItem>
      <StatsItem className={hasRecoverable ? 'statsItemWide' : ''}>
        <StatsHeader>
          <StatsInfo>
            Total recoverable
            <HelpNotification helperText={'Lorem fishy'} />
          </StatsInfo>
          {hasRecoverable && <StatsButton disabled={true}>Recover all</StatsButton>}
        </StatsHeader>
        <StatsContent>
          <TotalValue value={recoverable} />
        </StatsContent>
      </StatsItem>
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
