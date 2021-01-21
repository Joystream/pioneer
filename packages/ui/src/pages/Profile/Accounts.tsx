import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors } from '../../constants'
import { useAccounts } from '../../hooks/useAccounts'
import { useBalances } from '../../hooks/useBalances'

export function Accounts() {
  const { allAccounts, hasAccounts } = useAccounts()
  const balances = useBalances(allAccounts)

  if (!hasAccounts) return <Loading>Loading accounts...</Loading>

  return (
    <MyProfile>
      <AccountPlaceholder></AccountPlaceholder>
      <AccountsBoard>
        <AccountsTabs></AccountsTabs>
        <AccountsTable>
          <AccountsTableHeader></AccountsTableHeader>
          <AccountsList>
            {allAccounts.map((account) => (
              <AccountItem key={account.address}>
                <AccountInfo>
                  <h3>{account.name}</h3>
                  <p>{account.address}</p>
                </AccountInfo>
                <AccountBalances>
                  <p>{balances.map[account.address]?.total || '-'}</p>
                </AccountBalances>
                <AccountControls></AccountControls>
              </AccountItem>
            ))}
          </AccountsList>
        </AccountsTable>
      </AccountsBoard>
    </MyProfile>
  )
}

const MyProfile = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 250px auto;
  grid-template-areas:
    'profilesetings'
    'accountsboard';
  grid-row-gap: 16px;
  width: 100%;
`

const AccountPlaceholder = styled.section`
  grid-area: profilesetings;
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
  grid-area: accountstabs;
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

const AccountsTableHeader = styled.div`
  grid-area: accountstablenav;
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
  grid-template-columns: 280px 1fr 136px;
  grid-template-rows: 1fr;
  grid-column-gap: 8px;
  grid-template-areas: 'singleaccountinfo 
    singleaccountbalances 
    singleaccountcontrols';
  align-items: center;
  width: 100%;
  padding: 16px 0;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
`

const AccountInfo = styled.div`
  display: grid;
  grid-area: singleaccountinfo;
  width: 100%;
  height: 100%;
  padding: 0 8px 0 16px;
`

const AccountBalances = styled.div`
  display: grid;
  grid-area: singleaccountbalances;
`

const AccountControls = styled.div`
  display: grid;
  grid-area: singleaccountcontrols;
  grid-template-columns: repeat(3, 40px);
  grid-template-rows: 40px;
  grid-column-gap: 8px;
`

const Loading = styled.div`
  font-size: 2em;
`
