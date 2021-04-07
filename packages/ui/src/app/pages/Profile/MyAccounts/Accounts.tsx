import BN from 'bn.js'
import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '../../../../accounts/components/AccountInfo'
import { useAccounts } from '../../../../accounts/hooks/useAccounts'
import { useBalance } from '../../../../accounts/hooks/useBalance'
import { useBalances } from '../../../../accounts/hooks/useBalances'
import { filterAccounts } from '../../../../accounts/model/filterAccounts'
import { sortAccounts, SortKey } from '../../../../accounts/model/sortAccounts'
import { PageTab, PageTabsNav } from '../../../../common/components/page/PageTabs'
import { HeaderText, SortIconDown, SortIconUp } from '../../../../common/components/SortedListHeaders'
import { TransferButton } from '../../../../common/components/TransferButton'
import { TokenValue } from '../../../../common/components/typography'
import { Account } from '../../../../common/types'
import { BorderRad, Colors, Sizes } from '../../../constants'

import { setOrder } from './helpers'

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

  return (
    <>
      <AccountsTabs tabsSize="xs">
        <PageTab active={isDisplayAll} onClick={() => !isDisplayAll && setIsDisplayAll(true)}>
          All accounts
        </PageTab>
        <PageTab active={!isDisplayAll} onClick={() => isDisplayAll && setIsDisplayAll(false)}>
          Transferable balance
        </PageTab>
      </AccountsTabs>
      <AccountsWrap>
        <ListHeaders>
          <Header sortKey="name">Account</Header>
          <Header sortKey="total">Total balance</Header>
          <Header sortKey="locked">Locked balance</Header>
          <Header sortKey="recoverable">Recoverable balance</Header>
          <Header sortKey="transferable">Transferable balance</Header>
        </ListHeaders>
        <AccountsList>
          {sortedAccounts.map((account) => (
            <AccountItemData key={account.address} account={account} />
          ))}
        </AccountsList>
      </AccountsWrap>
    </>
  )
}

interface AccountItemDataProps {
  account: Account
}

const AccountItemData = ({ account }: AccountItemDataProps) => {
  const address = account.address
  const balance = useBalance(address)

  const isSendDisabled = !balance?.transferable || !balance.transferable.gt(new BN(0))

  return (
    <AccountItem key={address}>
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
    </AccountItem>
  )
}

interface HeaderProps {
  children: ReactNode
  sortKey: SortKey
}

const AccountsTabs = styled(PageTabsNav)`
  grid-area: accountstabs;
`

const AccountsWrap = styled.div`
  display: grid;
  grid-area: accountstable;
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

  & + & {
    margin-top: -1px;
  }
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
