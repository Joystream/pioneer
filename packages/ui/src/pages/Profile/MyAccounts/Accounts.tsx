import BN from 'bn.js'
import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Account } from '../../../common/types'
import { AccountInfo } from '../../../components/AccountInfo'
import { PageTab, PageTabsNav } from '../../../components/page/PageTabs'
import { TransferButton } from '../../../components/TransferButton'
import { TokenValue } from '../../../components/typography'
import { BorderRad, Colors, Sizes } from '../../../constants'
import { useAccounts } from '../../../hooks/useAccounts'
import { useBalance } from '../../../hooks/useBalance'
import { useBalances } from '../../../hooks/useBalances'
import { filterAccounts } from '../../../utils/filterAccounts'
import { sortAccounts, SortKey } from '../../../utils/sortAccounts'
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

  const Header = ({ text, sortKey }: HeaderProps) => {
    return (
      <ListHeader onClick={getOnSort(sortKey)}>
        <HeaderText>
          {text}
          {sortBy === sortKey && (isDescending ? <ArrowDown /> : <ArrowUp />)}
        </HeaderText>
      </ListHeader>
    )
  }

  return (
    <>
      <AccountsTabs>
        <AccountTab active={isDisplayAll} onClick={() => !isDisplayAll && setIsDisplayAll(true)}>
          All accounts
        </AccountTab>
        <AccountTab active={!isDisplayAll} onClick={() => isDisplayAll && setIsDisplayAll(false)}>
          Transferable balance
        </AccountTab>
      </AccountsTabs>
      <AccountsWrap>
        <ListHeaders>
          <Header text="Account" sortKey="name" />
          <Header text="Total balance" sortKey="total" />
          <Header text="Locked balance" sortKey="locked" />
          <Header text="Recoverable balance" sortKey="recoverable" />
          <Header text="Transferable balance" sortKey="transferable" />
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
  const balance = useBalance(account)

  const isSendDisabled = !balance?.transferable || !balance.transferable.gt(new BN(0))

  return (
    <AccountItem key={account.address}>
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
  text: string
  sortKey: SortKey
}

const AccountsTabs = styled(PageTabsNav)`
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

const AccountsWrap = styled.div`
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
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: right;
  user-select: none;
  cursor: pointer;

  &:first-child {
    justify-content: flex-start;
    text-align: left;
  }
`

const HeaderText = styled.span`
  position: relative;
`

const Arrow = styled.span`
  content: '';
  position: absolute;
  left: -10px;
  top: 5px;
  width: 4px;
  height: 4px;
  border: 1px solid ${Colors.Black[600]};
  transform: rotate(-45deg);
`

const ArrowUp = styled(Arrow)`
  border-left: 1px solid transparent;
  border-bottom: 1px solid transparent;
`

const ArrowDown = styled(Arrow)`
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
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
