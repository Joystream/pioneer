import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { filterAccounts } from '@/accounts/model/filterAccounts'
import { ButtonPrimary } from '@/common/components/buttons'
import MultilineChart from '@/common/components/charts/MultiLineChart'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { List, ListItem } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { FilterTextSelect } from '@/common/components/selects'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO, Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useAllAccountsStakingRewards } from '@/validators/hooks/useAllAccountsStakingRewards'
import { ChartTimeRange, useMyStakingChartData } from '@/validators/hooks/useMyStakingChartData'
import { useMyStakingInfo } from '@/validators/hooks/useMyStakingInfo'
import { useMyStakingRewards } from '@/validators/hooks/useMyStakingRewards'
import { useMyStashPositions } from '@/validators/hooks/useMyStashPositions'
import { useValidatorsList } from '@/validators/hooks/useValidatorsList'
import { ValidatorSortKey, setValidatorOrder, sortValidatorAccounts } from '@/validators/model/sortValidatorAccounts'

import { ValidatorAccountItem } from './dashboard/ValidatorAccountItem'
import { NominatorPositionsTable } from './nominator/NominatorPositionsTable'

export function Overview() {
  const { allAccounts, hasAccounts, isLoading, wallet } = useMyAccounts()
  const { showModal } = useModal()
  const [isDisplayAll] = useState(true)
  const balances = useMyBalances()
  const [sortBy, setSortBy] = useState<ValidatorSortKey>('claimable')
  const [isDescending, setDescending] = useState(false)
  const [chartTimeRange, setChartTimeRange] = useState<ChartTimeRange>('month')
  const { validatorsWithDetails } = useValidatorsList()
  const stakingInfo = useMyStakingInfo()
  const stakingRewards = useMyStakingRewards()
  const stashPositions = useMyStashPositions()
  const visibleAccounts = useMemo(
    () => filterAccounts(allAccounts, isDisplayAll, balances),
    [JSON.stringify(allAccounts), isDisplayAll, hasAccounts]
  )

  const validatorAccounts = useMemo(() => {
    if (!stashPositions) return []
    const validatorStashes = new Set(stashPositions.filter((pos) => pos.role === 'validator').map((pos) => pos.stash))
    return visibleAccounts.filter((account) => validatorStashes.has(account.address))
  }, [visibleAccounts, stashPositions])

  const stakingRewardsMap = useAllAccountsStakingRewards(validatorAccounts)

  const sortedAccounts = useMemo(
    () => sortValidatorAccounts(validatorAccounts, sortBy, isDescending, stakingRewardsMap),
    [validatorAccounts, sortBy, isDescending, stakingRewardsMap]
  )

  const accountsToRender = useMemo(() => {
    if (stashPositions && validatorAccounts.length > 0) {
      if (stakingRewardsMap) {
        return sortedAccounts.filter((account) => stakingRewardsMap.get(account.address)?.hasClaimable)
      } else {
        return sortedAccounts
      }
    }
    return []
  }, [sortedAccounts, stakingRewardsMap, stashPositions, validatorAccounts])

  const shouldShowAccountsSection = isLoading || accountsToRender.length > 0 || stashPositions === undefined

  const chartData = useMyStakingChartData(chartTimeRange)

  const positions = stashPositions ?? []
  const accountsMap = useMemo(() => new Map(allAccounts.map((account) => [account.address, account])), [allAccounts])
  const validatorsMap = useMemo(
    () => new Map((validatorsWithDetails ?? []).map((validator) => [validator.stashAccount, validator])),
    [validatorsWithDetails]
  )
  const totalStake = stakingInfo?.totalStake ?? BN_ZERO
  const totalClaimable = stakingRewards?.claimableRewards ?? BN_ZERO

  const getOnSort = (key: ValidatorSortKey) => () =>
    setValidatorOrder(key, sortBy, setSortBy, isDescending, setDescending)

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

  const filterOptions: { label: string; value: ChartTimeRange }[] = [
    { label: 'Last Month', value: 'month' },
    { label: 'Last Week', value: 'week' },
    { label: 'Last Day', value: 'day' },
  ]

  return (
    <ContentWithTabs>
      <ChartWarp>
        <ChartHeader>
          <HeaderText>VALIDATOR PERFORMANCE</HeaderText>
          <FilterBox>
            <FilterTextSelect
              options={filterOptions.map((opt) => opt.label)}
              value={filterOptions.find((opt) => opt.value === chartTimeRange)?.label || filterOptions[0].label}
              onChange={(value) => {
                const selected = filterOptions.find((opt) => opt.label === value)
                if (selected) setChartTimeRange(selected.value)
              }}
            />
          </FilterBox>
        </ChartHeader>
        <MultilineChart data={chartData} />
      </ChartWarp>
      {shouldShowAccountsSection && (
        <AccountsSection>
          <AccountsSectionTitle>Unclaimed Rewards</AccountsSectionTitle>
          <AccountsWrap>
            <ListHeaders>
              <Header sortKey="name">ACCOUNT</Header>
              <Header sortKey="totalEarned">TOTAL EARNED</Header>
              <Header sortKey="claimable">CLAIMABLE</Header>
            </ListHeaders>
            <List>
              {isLoading ? (
                <LoadingRow>
                  <Loading text="Loading rewards..." withoutMargin />
                </LoadingRow>
              ) : accountsToRender.length > 0 ? (
                accountsToRender.map((account) => (
                  <ListItem key={account.address}>
                    <ValidatorAccountItem account={account} stakingRewards={stakingRewardsMap?.get(account.address)} />
                  </ListItem>
                ))
              ) : stakingRewardsMap ? (
                <LoadingRow>
                  <TextMedium lighter>No claimable rewards found.</TextMedium>
                </LoadingRow>
              ) : (
                <LoadingRow>
                  <Loading text="Loading rewards..." withoutMargin />
                </LoadingRow>
              )}
            </List>
          </AccountsWrap>
        </AccountsSection>
      )}
      <PositionsSection
        positions={positions}
        accountsMap={accountsMap}
        validatorsMap={validatorsMap}
        totalStake={totalStake}
        totalClaimable={totalClaimable}
      />
    </ContentWithTabs>
  )
}

interface HeaderProps {
  children: ReactNode
  sortKey: ValidatorSortKey
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
  gap: 8px;
`

const AccountsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const AccountsSectionTitle = styled(HeaderText)`
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${Colors.Black[400]};
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

  ${List} {
    gap: 8px;
  }
  ${ListItem} {
    background: ${Colors.Black[50]};
  }
`

const LoadingRow = styled.div`
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: accountstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 276px repeat(2, 128px) 104px;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
`

export const ListHeader = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  justify-self: start;
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

const PositionsSection = styled(NominatorPositionsTable)`
  margin-top: 24px;
`
