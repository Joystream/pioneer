import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'
import { AccountInfo } from '../../components/AccountInfo'
import { ButtonGhostMediumSquare, ButtonPrimarySmall } from '../../components/buttons/Buttons'
import { ArrowDownIcon } from '../../components/icons/ArrowDownIcon'
import { ArrowInsideIcon } from '../../components/icons/ArrowInsideIcon'
import { HelpNotification } from '../../components/notifications/HelpNotification'
import { PageTab, PageTabs } from '../../components/page/PageTabs'
import { PageTitle } from '../../components/page/PageTitle'
import { Label } from '../../components/page/Typography/Label'
import { ValueInJoys } from '../../components/page/Typography/ValueInJoys'
import { TokenValue } from '../../components/TokenValue'
import { TransferButton } from '../../components/TransferButton'
import { BorderRad, Colors, Shadows } from '../../constants'
import { useAccounts } from '../../hooks/useAccounts'
import { useBalances } from '../../hooks/useBalances'

export function Accounts() {
  const { allAccounts, hasAccounts } = useAccounts()
  const balances = useBalances(allAccounts)

  if (!hasAccounts) return <Loading>Loading accounts...</Loading>

  const sendTo = allAccounts[allAccounts.length - 1]

  return (
    <MyProfile>
      <AccountHead>
        <PageTitle>My profile</PageTitle>
        <ProfileSummary>
          <PageTabs>
            <PageTab>My accounts</PageTab>
          </PageTabs>
          <Stats>
            <StatsItem>
              <StatsHeader>
                <StatsInfo>
                  Total balance
                  <HelpNotification helperText={'Lorem fishy'} />
                </StatsInfo>
              </StatsHeader>
              <StatsContent>
                <ValueInJoys>109,821.242</ValueInJoys>
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
                <ValueInJoys>80,000.000</ValueInJoys>
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
                <ValueInJoys>50,000.000</ValueInJoys>
              </StatsContent>
            </StatsItem>
            <StatsItem className={'statsItemWide'}>
              <StatsHeader>
                <StatsInfo>
                  Total recoverable
                  <HelpNotification helperText={'Lorem fishy'} />
                </StatsInfo>
                <StatsButton>Recover all</StatsButton>
              </StatsHeader>
              <StatsContent>
                <ValueInJoys>5,080.000</ValueInJoys>
              </StatsContent>
            </StatsItem>
          </Stats>
        </ProfileSummary>
      </AccountHead>
      <AccountsBoard>
        <AccountsTabs>
          <AccountTab>All accounts</AccountTab>
        </AccountsTabs>
        <AccountsTable>
          <AccountsTableHeaders>
            <TableColumnTitle>Account</TableColumnTitle>
            <TableColumnTitle>Total balance</TableColumnTitle>
            <TableColumnTitle>Locked balance</TableColumnTitle>
            <TableColumnTitle>Recoverable balance</TableColumnTitle>
            <TableColumnTitle>Transferable balance</TableColumnTitle>
          </AccountsTableHeaders>
          <AccountsList>
            {allAccounts.map((account) => (
              <AccountItem key={account.address}>
                <AccountInfo account={account} />
                <AccountBalance>
                  <Balance value={balances.map[account.address]?.total} />
                </AccountBalance>
                <AccountBalance>
                  <TokenValue value={0} />
                </AccountBalance>
                <AccountBalance>
                  <TokenValue value={0} />
                </AccountBalance>
                <AccountBalance>
                  <Balance value={balances.map[account.address]?.total} />
                </AccountBalance>
                <AccountControls>
                  <ButtonInside>
                    <ArrowInsideIcon />
                  </ButtonInside>
                  <TransferButton from={account} to={sendTo} />
                  <ButtonApply>
                    <ArrowDownIcon />
                  </ButtonApply>
                </AccountControls>
              </AccountItem>
            ))}
          </AccountsList>
        </AccountsTable>
      </AccountsBoard>
    </MyProfile>
  )
}

interface Props {
  value: BN | undefined
}

export function Balance({ value }: Props) {
  return <>{value ? <TokenValue value={value} /> : '-'}</>
}

const MyProfile = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    'profilesetings'
    'accountsboard';
  grid-row-gap: 24px;
  width: 100%;
`

const AccountHead = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px auto;
  grid-row-gap: 16px;
`

const ProfileSummary = styled.div`
  display: flex;
  flex-direction: column;

  ${PageTabs} {
    margin-bottom: 24px;
  }
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

const AccountsBoard = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px auto;
  grid-template-areas:
    'accountstabs'
    'accountstable';
  grid-row-gap: 18px;
  width: 100%;
`

const AccountsTabs = styled(PageTabs)`
  grid-area: accountstabs;

  &:after {
    display: none;
  }
`

const StatsInfo = styled(Label)`
  position: relative;
`

const StatsContent = styled.div`
  margin-top: auto;
`

const AccountTab = styled(PageTab)`
  display: inline-flex;
  width: fit-content;
  font-size: 14px;
  line-height: 20px;
`

const AccountsTable = styled.div`
  display: grid;
  grid-area: accountstable;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'accountstablenav'
    'accountslist';
  grid-row-gap: 6px;
  width: 100%;
`

const AccountsTableHeaders = styled.div`
  display: grid;
  grid-area: accountstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 236px 0.9fr 0.7fr 0.7fr 0.65fr 154px;
  grid-column-gap: 14px;
  width: 100%;
  padding-left: 16px;
`

const TableColumnTitle = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: right;

  &:first-child {
    justify-content: flex-start;
    text-align: left;
  }
  &:last-child {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 8px;
      right: -15px;
      width: 4px;
      height: 4px;
      border: 1px solid ${Colors.Black[600]};
      border-left: 1px solid transparent;
      border-bottom: 1px solid transparent;
      transform: rotate(-45deg);
    }
  }
`

const AccountsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`

const AccountItem = styled.li`
  display: grid;
  grid-template-columns: 236px 0.9fr 0.7fr 0.7fr 0.65fr 154px;
  grid-template-rows: 1fr;
  grid-column-gap: 14px;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: 94px;
  padding: 16px 0 16px 14px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
`

const AccountBalance = styled.p`
  display: grid;
`

const AccountControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 40px);
  grid-template-rows: 40px;
  grid-column-gap: 8px;
`

const ButtonInside = styled(ButtonGhostMediumSquare)`
  svg {
    color: ${Colors.Black[900]};
  }
`
const ButtonApply = styled(ButtonGhostMediumSquare)`
  &,
  &:hover,
  &:focus,
  &:active,
  &:disabled {
    border: 1px solid transparent;
  }

  svg {
    color: ${Colors.Black[900]};
  }
`

const Loading = styled.div`
  font-size: 2em;
`
