import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { useBalances } from '@/accounts/hooks/useBalance'
import { useVotingOptOutAccounts } from '@/accounts/hooks/useVotingOptOutAccounts'
import { Balances } from '@/accounts/types'
import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { InfoSymbol } from '@/common/components/icons/symbols'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Pagination } from '@/common/components/Pagination'
import { TokenValueStat } from '@/common/components/statistics'
import { TextBig, TextInlineMedium } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'

import { ElectionTabs } from '../components/ElectionTabs'

import { BlacklistedAccount } from './BlacklistedAccount'

interface TotalBalanceProp {
  addresses: string[]
}

export const BlacklistedAccounts = () => {
  const ACCOUNTS_PER_PAGE = 18
  const [page, setPage] = useState(1)
  const votingOptOutAccounts = useVotingOptOutAccounts()
  const [paginatedAccounts, setPaginatedAccounts] = useState<string[] | undefined>()

  useEffect(() => {
    if (votingOptOutAccounts && votingOptOutAccounts.length > 0){
      setPaginatedAccounts(
        votingOptOutAccounts.filter(
          (votingOptOutAccount, i) => i >= ACCOUNTS_PER_PAGE * (page - 1) && i < page * ACCOUNTS_PER_PAGE
        )
      )
    }
  }, [votingOptOutAccounts, page])

  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Elections</PageTitle>
      </PageHeaderRow>
      <ElectionTabs />
    </PageHeaderWrapper>
  )

  const warningContent = (
    <Container>
      <InfoSymbol />
      <TextInlineMedium>
        These accounts are excluded from participating in elections, and cannot be used for voting.
      </TextInlineMedium>
    </Container>
  )

  const displayMain = () => {
    return (
      <MainPanel>
        <Warning content={warningContent} isClosable={false} isYellow />
        <RowGapBlock gap={12}>
          {(!votingOptOutAccounts || !votingOptOutAccounts.length) && <TextBig>No accounts found</TextBig>}
          {paginatedAccounts && paginatedAccounts.length > 0 && (
            <>
            <TotalBalance addresses={votingOptOutAccounts || []} />
              <Pagination
                pageCount={votingOptOutAccounts && Math.ceil(votingOptOutAccounts.length / ACCOUNTS_PER_PAGE)}
                handlePageChange={setPage}
                page={page}
              />

              <h6>Accounts ({votingOptOutAccounts?.length})</h6>
              <BlacklistedAccountsList>
                {paginatedAccounts.map((address, i) => (
                  <BlacklistedAccount key={i} address={address} />
                ))}
              </BlacklistedAccountsList>
              <Pagination
                pageCount={votingOptOutAccounts && Math.ceil(votingOptOutAccounts.length / ACCOUNTS_PER_PAGE)}
                handlePageChange={setPage}
                page={page}
              />
            </>
          )}
        </RowGapBlock>
      </MainPanel>
    )
  }

  return <PageLayout header={header} main={displayMain()} />
}

const TotalBalance = ({ addresses }: TotalBalanceProp) => {
  const balances = useBalances(addresses)
  const total = useMemo(() => {
    let prev = new BN(0)
    balances.forEach((value: Balances | undefined) => {
      prev = value ? prev.add(value.total) : prev
    })
    return prev
  },[balances])

  return <TokenValueStat title="Total balance of all accounts" value={total} />
}

const Container = styled.div`
  display: flex;
  gap: 8px;

  svg {
    margin: auto 0px;
  }
`
const BlacklistedAccountsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`
