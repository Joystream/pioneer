import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'

import { AccountItemLoading } from '@/accounts/components/AccountItem/AccountItemLoading'
import { ButtonPrimary } from '@/common/components/buttons'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { Tabs } from '@/common/components/Tabs'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { SortKey, setOrder, sortAccounts } from '@/accounts/model/sortAccounts'
import { List, ListItem } from '@/common/components/List'
import { ValidatorAccountItem } from './dashboard/ValidatorAccountItem'
import { filterAccounts } from '@/accounts/model/filterAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { RewardHistoryItem } from './dashboard/RewardHistoryItem'

export function RewardHistory() {
    const { allAccounts, hasAccounts, isLoading, wallet } = useMyAccounts()
    const { showModal } = useModal()
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



    if (!hasAccounts && !isLoading) {
        return (
            <EmptyPagePlaceholder
                title="Connect your wallet or create an account"
                copy="A Polkadot wallet is required to see a breakdown of all your connected wallet account balances."
                button={
                    <ButtonPrimary size="large" onClick={() => showModal({ modal: 'OnBoardingModal' })}>
                        {!wallet ? 'Connect Wallet' : 'Join Now'}
                    </ButtonPrimary>
                }
            />
        )
    }

    return (
        <ContentWithTabs>
            <AccountsWrap>
                <ListHeaders>
                    <Header sortKey='name'>ACCOUNT</Header>
                    <Header sortKey='total'>EPOCH</Header>
                    <Header sortKey='total'>DATE</Header>
                </ListHeaders>
                <List>
                    {!isLoading ? (
                        sortedAccounts.map((account) => (
                            <ListItem key={account.address} borderless>
                                <RewardHistoryItem account={account} />
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
  grid-template-columns: 32px repeat(2,128px) 104px;
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
