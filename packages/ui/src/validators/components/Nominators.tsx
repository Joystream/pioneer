import React, { ReactNode, useMemo, useState } from 'react'
import { combineLatest, map, of, switchMap } from 'rxjs'
import styled from 'styled-components'

import { AccountItemLoading } from '@/accounts/components/AccountItem/AccountItemLoading'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { filterAccounts } from '@/accounts/model/filterAccounts'
import { sortAccounts, SortKey, setOrder } from '@/accounts/model/sortAccounts'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { List, ListItem } from '@/common/components/List'
import { ContentWithTabs } from '@/common/components/page/PageContent'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { Colors, BN_ZERO } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { NominatorInfo } from '@/validators/hooks/useNominatorInfo'

import { NominatorAccountItem } from './dashboard/NominatorItem'

export function Nominators() {
  const { allAccounts, hasAccounts, isLoading, wallet } = useMyAccounts()
  const { api } = useApi()
  const { showModal } = useModal()
  const [isDisplayAll] = useState(true)
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

  // Fetch all nominator info at once to avoid hooks in loop
  const nominatorInfos = useObservable(() => {
    if (!api || !sortedAccounts.length) return of(new Map<string, NominatorInfo>())

    return combineLatest(
      sortedAccounts.map((account) =>
        combineLatest([api.query.staking.nominators(account.address), api.query.staking.bonded(account.address)]).pipe(
          switchMap(([nominations, bonded]) => {
            const isNominating = !nominations.isEmpty
            const targets = isNominating ? nominations.unwrap().targets.map((target) => target.toString()) : []

            if (bonded.isNone) {
              return of({
                address: account.address,
                info: { isNominating, targets, activeStake: BN_ZERO, totalStake: BN_ZERO },
              })
            }
            const controller = bonded.unwrap().toString()
            return api.query.staking.ledger(controller).pipe(
              map((ledger) => {
                if (ledger.isNone) {
                  return {
                    address: account.address,
                    info: { isNominating, targets, activeStake: BN_ZERO, totalStake: BN_ZERO },
                  }
                }
                const ledgerData = ledger.unwrap()
                return {
                  address: account.address,
                  info: {
                    isNominating,
                    targets,
                    activeStake: ledgerData.active.toBn(),
                    totalStake: ledgerData.total.toBn(),
                  },
                }
              })
            )
          })
        )
      )
    ).pipe(
      map((results) => {
        const map = new Map<string, NominatorInfo>()
        results.forEach(({ address, info }) => {
          map.set(address, info)
        })
        return map
      })
    )
  }, [api?.isConnected, JSON.stringify(sortedAccounts.map((a) => a.address))])

  // Filter accounts that have zero stake
  const accountsToRender = useMemo(() => {
    if (!nominatorInfos) return []
    return sortedAccounts.filter((account) => {
      const info = nominatorInfos.get(account.address)
      return info && (info.isNominating || !info.totalStake.isZero() || !info.activeStake.isZero())
    })
  }, [sortedAccounts, nominatorInfos])

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
          <Header sortKey="name">NOMINATOR</Header>
          <Header sortKey="total">NOMINATING</Header>
          <Header sortKey="total">TOTAL STAKED</Header>
        </ListHeaders>
        <List>
          {!isLoading ? (
            accountsToRender.map((account) => (
              <ListItem key={account.address}>
                <NominatorAccountItem account={account} nominatorInfo={nominatorInfos?.get(account.address)} />
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

  ${List} {
    gap: 8px;
  }
  ${ListItem} {
    background: ${Colors.Black[50]};
  }
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: accountstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 276px repeat(2, 213px);
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
