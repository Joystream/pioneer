import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { AccountItemLoading } from '@/accounts/components/AccountItem/AccountItemLoading'
import { List, ListItem } from '@/common/components/List'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { Colors } from '@/common/constants'

import { useMyAccounts } from '../../../../accounts/hooks/useMyAccounts'
import { useMyBalances } from '../../../../accounts/hooks/useMyBalances'
import { filterAccounts } from '../../../../accounts/model/filterAccounts'
import { sortAccounts, SortKey } from '../../../../accounts/model/sortAccounts'

import { BlackListItem } from './BlackListItem'

export function BlackList() {
  const { allAccounts, hasAccounts, isLoading } = useMyAccounts()
  const [isDisplayAll, setIsDisplayAll] = useState(true)
  const balances = useMyBalances()
  const [sortBy, setSortBy] = useState<SortKey>('name')
  const visibleAccounts = useMemo(
    () => filterAccounts(allAccounts, isDisplayAll, balances),
    [JSON.stringify(allAccounts), isDisplayAll, hasAccounts]
  )
  const sortedAccounts = useMemo(
    () => sortAccounts(visibleAccounts, balances, sortBy),
    [visibleAccounts, balances, sortBy]
  )
  return (
    <ContentWithTabs>
      <AccountsWrap>
        <List>
          {!isLoading ? (
            sortedAccounts.map((account) => (
              <ListItem key={account.address} borderless>
                <BlackListItem account={account} />
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
