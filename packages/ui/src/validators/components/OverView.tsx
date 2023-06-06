import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'

import { AccountItemLoading } from '@/accounts/components/AccountItem/AccountItemLoading'
import { ButtonPrimary } from '@/common/components/buttons'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { SortKey, setOrder, sortAccounts } from '@/accounts/model/sortAccounts'
import { List, ListItem } from '@/common/components/List'
import { ValidatorAccountItem } from './dashboard/ValidatorAccountItem'
import { filterAccounts } from '@/accounts/model/filterAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import MultilineChart, { MultilineChartData } from '@/common/components/charts/MultiLineChart'
import { FilterTextSelect } from '@/common/components/selects'
import { camelCaseToText } from '@/common/helpers'

export function Overview() {
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

    const chartTestData: MultilineChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        barData: [12, 23, 23, 42, 23],
        rewardData: [34, 22, 34, 22, 32],
        stakeData: [14, 32, 33, 42, 12]
    }

    const filterOptions: string[] = [
        'by Month',
        "by Years",
        "by Days"
    ];

    return (
        <ContentWithTabs>
            <ChartWarp>
                <ChartHeader>
                    <HeaderText>VALIDATOR PERFORMANCERS</HeaderText>
                    <FilterBox>
                        <FilterTextSelect
                            options={filterOptions}
                            value={filterOptions && camelCaseToText(filterOptions[0])}
                            onChange={(value) => {

                            }}
                        />
                    </FilterBox>
                </ChartHeader>
                <MultilineChart data={chartTestData} />
            </ChartWarp>
            <AccountsWrap>
                <ListHeaders>
                    <Header sortKey='name'>ACCOUNT</Header>
                    <Header sortKey='total'>TOTAL EARNED</Header>
                    <Header sortKey='total'>CLAIMABLE</Header>
                </ListHeaders>
                <List>
                    {!isLoading ? (
                        sortedAccounts.map((account) => (
                            <ListItem key={account.address} borderless>
                                <ValidatorAccountItem account={account} />
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
const ChartWarp = styled.div`
    padding-bottom: 20px;
`
const FilterBox = styled.div`
    display: flex;
    justify-content: flex-end;
    * {
        width: 200px;
    }

`

const ChartHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 8px;
    justify-content: space-between;
    gap: 8px
`

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
  grid-template-columns: 276px repeat(2, 128px) 104px;
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
