import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'

import { AccountItemLoading } from '@/accounts/components/AccountItem/AccountItemLoading'
import { List, ListItem } from '@/common/components/List'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { Tabs } from '@/common/components/Tabs'
import { Colors } from '@/common/constants'

import { useMyAccounts } from '../hooks/useMyAccounts'
import { useMyBalances } from '../hooks/useMyBalances'
import { filterAccounts } from '../model/filterAccounts'
import { setOrder, sortAccounts, SortKey } from '../model/sortAccounts'

import { AccountItem } from './AccountItem/AccountItem'

export function Accounts() {
  const { allAccounts, hasAccounts, isLoading } = useMyAccounts()
  const [isDisplayAll, setIsDisplayAll] = useState(true)
  const balances = useMyBalances()
  const [sortBy, setSortBy] = useState<SortKey>('name')
  const [isDescending, setDescending] = useState(false)
  const visibleAccounts = useMemo(
    () => filterAccounts(allAccounts, isDisplayAll, balances),
    [JSON.stringify(allAccounts), isDisplayAll, hasAccounts]
  )
  const sortedAccounts = useMemo(
    () => sortAccounts(visibleAccounts, balances, sortBy, isDescending),
    [visibleAccounts, balances, sortBy, isDescending]
  )

  const getOnSort = (key: SortKey) => () => setOrder(key, sortBy, setSortBy, isDescending, setDescending)

  const Header = ({ children, sortKey }: HeaderProps) => {
    return (
      <ListHeader onClick={getOnSort(sortKey)}>
        <HeaderText>
          {children}
          {sortBy === sortKey && (isDescending ? <SortIconDown /> : <SortIconUp />)}
        </HeaderText>
      </ListHeader>
    )
  }

  const tabs = [
    { title: 'All accounts', onClick: () => !isDisplayAll && setIsDisplayAll(true), active: isDisplayAll },
    { title: 'Transferable balance', onClick: () => isDisplayAll && setIsDisplayAll(false), active: !isDisplayAll },
  ]

  return (
    <ContentWithTabs>
      <Tabs tabsSize="xs" tabs={tabs} />
      <AccountsWrap>
        <ListHeaders>
          <Header sortKey="name">Account</Header>
          <Header sortKey="total">Total balance</Header>
          <Header sortKey="locked">Locked balance</Header>
          <Header sortKey="recoverable">Recoverable balance</Header>
          <Header sortKey="transferable">Transferable balance</Header>
        </ListHeaders>
        <List>
          {!isLoading ? (
            sortedAccounts.map((account) => (
              <ListItem key={account.address} borderless>
                <AccountItem account={account} />
              </ListItem>
            ))
          ) : (
            <AccountItemLoading count={5} />
          )}
        </List>
      </AccountsWrap>
    </ContentWithTabs>
  )
}

interface HeaderProps {
  children: ReactNode
  sortKey: SortKey
}

const AccountsWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'accountstablenav'
    'accountslist';
  grid-row-gap: 4px;
  width: 100%;
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: accountstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 276px repeat(4, 128px) 104px;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 8px;
`

export const ListHeader = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  justify-self: end;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: right;
  user-select: none;
  cursor: pointer;

  &:first-child {
    text-align: left;
    justify-self: start;
  }
`
