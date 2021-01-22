import React from 'react'
import styled from 'styled-components'
import { CopyButton } from '../../components/buttons/CopyButton'
import { BorderRad, Colors, Transitions } from '../../constants'
import { useAccounts } from '../../hooks/useAccounts'
import { useBalances } from '../../hooks/useBalances'
import { TransferButton } from '../../components/TransferButton'

export function Accounts() {
  const { allAccounts, hasAccounts } = useAccounts()
  const balances = useBalances(allAccounts)

  if (!hasAccounts) return <Loading>Loading accounts...</Loading>

  const sendTo = allAccounts[allAccounts.length - 1]

  return (
    <MyProfile>
      <AccountPlaceholder>My profile</AccountPlaceholder>
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
                <AccountInfo>
                  <AccountPhoto />
                  {/*<AccountType>Root account</AccountType>*/}
                  <AccountName>{account.name}</AccountName>
                  <AccountCopyAddress>
                    <AccountAddress>{account.address}</AccountAddress>
                    <AccountCopyButton />
                  </AccountCopyAddress>
                </AccountInfo>
                <AccountBalance>{balances.map[account.address]?.total || '-'}</AccountBalance>
                <AccountBalance>0 Unit</AccountBalance>
                <AccountBalance>0 Unit</AccountBalance>
                <AccountBalance>{balances.map[account.address]?.total || '-'}</AccountBalance>
                <AccountControls>
                  <TransferButton from={account} to={sendTo} />
                </AccountControls>
              </AccountItem>
            ))}
          </AccountsList>
        </AccountsTable>
      </AccountsBoard>
    </MyProfile>
  )
}

const MyProfile = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 46px auto;
  grid-template-areas:
    'profilesetings'
    'accountsboard';
  grid-row-gap: 16px;
  width: 100%;
`

const AccountPlaceholder = styled.section`
  display: flex;
  align-items: center;
  grid-area: profilesetings;
  font-size: 32px;
  line-height: 40px;
  font-weight: 900;
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

const AccountsTabs = styled.nav`
  display: flex;
  align-items: center;
  grid-area: accountstabs;
`

const AccountTab = styled.button`
  display: inline-flex;
  position: relative;
  align-items: center;
  width: fit-content;
  padding: 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${Colors.Black[900]};
  text-transform: capitalize;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: ${Transitions.all};

  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: ${Colors.Blue[500]};
    transition: ${Transitions.all};
  }
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
  padding: 17px 0 17px 15px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
`

const AccountInfo = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: min-content, 24px 18px;
  grid-column-gap: 12px;
  grid-template-areas:
    'accountphoto accounttype'
    'accountphoto accountname'
    'accountphoto accountaddress';
  align-items: center;
  width: 100%;
  justify-self: start;
`

const AccountPhoto = styled.div`
  display: flex;
  grid-area: accountphoto;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  align-self: center;
  height: 40px;
  width: 40px;
  background-color: ${Colors.Blue[500]};
  border-radius: ${BorderRad.full};
  overflow: hidden;
`

const AccountType = styled.p`
  display: flex;
  grid-area: accounttype;
  justify-content: center;
  width: fit-content;
  margin: 0;
  padding: 0 8px;
  font-size: 10px;
  line-height: 16px;
  border-radius: 8px;
  color: ${Colors.White};
  background-color: ${Colors.Blue[200]};
  text-transform: uppercase;
`

const AccountName = styled.h5`
  grid-area: accountname;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: ${Colors.Black[900]};
`

const AccountCopyAddress = styled.div`
  display: flex;
  grid-area: accountaddress;
  color: ${Colors.Black[400]};
`

const AccountAddress = styled.span`
  max-width: 152px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 18px;
  color: ${Colors.Black[400]};
`

const AccountCopyButton = styled(CopyButton)`
  color: ${Colors.Black[400]};
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

const Loading = styled.div`
  font-size: 2em;
`
