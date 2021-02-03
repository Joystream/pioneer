import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'
import { AccountInfo } from '../../../components/AccountInfo'
import { ButtonGhostMediumSquare } from '../../../components/buttons/Buttons'
import { ArrowDownIcon } from '../../../components/icons/ArrowDownIcon'
import { PageTab, PageTabs } from '../../../components/page/PageTabs'
import { TokenValue } from '../../../components/typography'
import { TransferButton } from '../../../components/TransferButton'
import { BorderRad, Colors, Sizes } from '../../../constants'
import { Account } from '../../../hooks/types'
import { useAccounts } from '../../../hooks/useAccounts'
import { useBalance } from '../../../hooks/useBalance'

export function Accounts() {
  const { allAccounts, hasAccounts } = useAccounts()

  if (!hasAccounts) return <Loading>Loading accounts...</Loading>

  return (
    <>
      <AccountsTabs>
        <AccountTab to="#">All accounts</AccountTab>
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
            <AccountItemData key={account.address} account={account} />
          ))}
        </AccountsList>
      </AccountsTable>
    </>
  )
}

interface Props {
  value: BN | undefined
}

export function Balance({ value }: Props) {
  return <>{value ? <TokenValue value={value} /> : '-'}</>
}

interface AccountItemDataProps {
  account: Account
}

const AccountItemData = ({ account }: AccountItemDataProps) => {
  const balance = useBalance(account)

  return (
    <AccountItem key={account.address}>
      <AccountInfo account={account} />
      <AccountBalance>
        <Balance value={balance?.total} />
      </AccountBalance>
      <AccountBalance>
        <TokenValue value={balance?.locked} />
      </AccountBalance>
      <AccountBalance>
        <TokenValue value={balance?.recoverable} />
      </AccountBalance>
      <AccountBalance>
        <Balance value={balance?.transferable} />
      </AccountBalance>
      <AccountControls>
        <TransferButton to={account} />
        <TransferButton from={account} />
        <ButtonApply>
          <ArrowDownIcon />
        </ButtonApply>
      </AccountControls>
    </AccountItem>
  )
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

const AccountsBoard = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20px auto;
  grid-template-areas:
    'accountstabs'
    'accountstable';
  grid-row-gap: 16px;
  width: 100%;
`

const AccountsTabs = styled(PageTabs)`
  grid-area: accountstabs;

  &:after {
    display: none;
  }
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
  grid-template-columns: 276px repeat(4, 128px) 136px;
  justify-content: space-between;
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
  grid-template-columns: 276px repeat(4, 128px) 136px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
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

export const ButtonApply = styled(ButtonGhostMediumSquare)`
  &,
  &:hover,
  &:focus,
  &:active,
  &:disabled {
    border: 1px solid transparent;
  }

  svg {
    color: ${Colors.Black[600]};
  }
`

const Loading = styled.div`
  font-size: 2em;
`
