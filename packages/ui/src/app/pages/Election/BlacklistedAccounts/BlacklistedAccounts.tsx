import { BN_ZERO } from '@polkadot/util'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { AnonymousAccount } from '@/accounts/components/AnonymousAccount'
import { useBalances } from '@/accounts/hooks/useBalance'
import { useVotingOptOutAccounts } from '@/accounts/hooks/useVotingOptOutAccounts'
import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { InfoSymbol } from '@/common/components/icons/symbols'
import { Loading } from '@/common/components/Loading'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Pagination } from '@/common/components/Pagination'
import { TokenValueStat } from '@/common/components/statistics'
import { TextBig, TextInlineMedium } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'

import { ElectionTabs } from '../components/ElectionTabs'

export const BlacklistedAccounts = () => {
  const ACCOUNTS_PER_PAGE = 18
  const [page, setPage] = useState(1)
  const votingOptOutAccounts = useVotingOptOutAccounts()
  const balances = useBalances(votingOptOutAccounts)
  const totalBalance = useMemo(
    () => Array.from(balances.values()).reduce((prev, value) => value?.total.add(prev) ?? prev, BN_ZERO),
    [balances]
  )
  const paginatedAccounts = useMemo(
    () =>
      votingOptOutAccounts
        ?.slice((page - 1) * ACCOUNTS_PER_PAGE, page * ACCOUNTS_PER_PAGE)
        .map((address) => ({ address, balance: balances.get(address)?.total })),
    [votingOptOutAccounts, page, balances]
  )

  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Elections</PageTitle>
      </PageHeaderRow>
      <ElectionTabs />
    </PageHeaderWrapper>
  )

  if (!votingOptOutAccounts) {
    return <PageLayout header={header} main={<Loading />} />
  }

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
              <TokenValueStat title="Total balance of all accounts" value={totalBalance} />
              <Pagination
                pageCount={votingOptOutAccounts && Math.ceil(votingOptOutAccounts.length / ACCOUNTS_PER_PAGE)}
                handlePageChange={setPage}
                page={page}
              />

              <h6>Accounts ({votingOptOutAccounts?.length})</h6>
              <BlacklistedAccountsList>
                {paginatedAccounts.map((account, i) => (
                  <AnonymousAccount key={i} address={account.address} amount={account.balance} />
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
