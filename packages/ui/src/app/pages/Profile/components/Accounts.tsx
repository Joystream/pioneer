import BN from 'bn.js'
import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '../../../../accounts/components/AccountInfo'
import { TransferButton } from '../../../../accounts/components/TransferButton'
import { useAccounts } from '../../../../accounts/hooks/useAccounts'
import { useBalance } from '../../../../accounts/hooks/useBalance'
import { useBalances } from '../../../../accounts/hooks/useBalances'
import { filterAccounts } from '../../../../accounts/model/filterAccounts'
import { setOrder, sortAccounts, SortKey } from '../../../../accounts/model/sortAccounts'
import { Account } from '../../../../accounts/types'
import { List, ListItem } from '../../../../common/components/List'
import { HeaderText, SortIconDown, SortIconUp } from '../../../../common/components/SortedListHeaders'
import { Tabs } from '../../../../common/components/Tabs'
import { TokenValue } from '../../../../common/components/typography'
import { Colors, Sizes } from '../../../../common/constants'

export function Accounts() {
  const { allAccounts, hasAccounts } = useAccounts()
  const [isDisplayAll, setIsDisplayAll] = useState(true)
  const balances = useBalances()
  const [sortBy, setSortBy] = useState<SortKey>('name')
  const [isDescending, setDescending] = useState(false)
  const visibleAccounts = useMemo(() => filterAccounts(allAccounts, isDisplayAll, balances), [
    allAccounts,
    isDisplayAll,
    hasAccounts,
  ])
  const sortedAccounts = useMemo(() => sortAccounts(visibleAccounts, balances, sortBy, isDescending), [
    visibleAccounts,
    balances,
    sortBy,
    isDescending,
  ])

  if (!hasAccounts) {
    return <Loading>Loading accounts...</Loading>
  }

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
    <>
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
          {sortedAccounts.map((account) => (
            <ListItem key={account.address}>
              <AccountItem account={account} />
            </ListItem>
          ))}
        </List>
      </AccountsWrap>
    </>
  )
}

interface AccountItemDataProps {
  account: Account
}

const AccountItem = ({ account }: AccountItemDataProps) => {
  const address = account.address
  const balance = useBalance(address)

  const isSendDisabled = !balance?.transferable || !balance.transferable.gt(new BN(0))

  return (
    <AccountItemWrap key={address}>
      <AccountInfo account={account} />
      <AccountBalance>
        <TokenValue value={balance?.total} />
      </AccountBalance>
      <AccountBalance>
        <TokenValue value={balance?.locked} />
      </AccountBalance>
      <AccountBalance>
        <TokenValue value={balance?.recoverable} />
      </AccountBalance>
      <AccountBalance>
        <TokenValue value={balance?.transferable} />
      </AccountBalance>
      <AccountControls>
        <TransferButton to={account} />
        <TransferButton from={account} disabled={isSendDisabled} />
      </AccountControls>
    </AccountItemWrap>
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
  grid-row-gap: 5px;
  width: 100%;
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: accountstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 276px repeat(4, 128px) 136px;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
`

const ListHeader = styled.span`
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

const AccountItemWrap = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(4, 128px) 136px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 0 16px 14px;
`

const AccountBalance = styled.p``

const AccountControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 40px);
  grid-template-rows: 40px;
  grid-column-gap: 8px;
`

const Loading = styled.div`
  font-size: 2em;
`
