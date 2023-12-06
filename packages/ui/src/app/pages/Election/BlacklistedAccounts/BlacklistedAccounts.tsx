import React from 'react'
import styled from 'styled-components'

import { useVotingOptOutAccounts } from '@/accounts/hooks/useVotingOptOutAccounts'
import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { InfoSymbol } from '@/common/components/icons/symbols'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { TextBig, TextInlineMedium } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'

import { ElectionTabs } from '../components/ElectionTabs'

import { BlacklistedAccount } from './BlacklistedAccount'

export const BlacklistedAccounts = () => {
  const votingOptOutAccounts = useVotingOptOutAccounts()

  // const [page, setPage] = useState(1)
  // const { order, getSortProps } = useSort<ElectionRoundOrderByInput>('cycleId')
  // const { isLoading, elections, pageCount } = usePastElections({ page, order })

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
    //   if (isLoading) {
    //     return (
    //       <MainPanel>
    //         <Loading />
    //       </MainPanel>
    //     )
    //   }

    return (
      <MainPanel>
        <Warning content={warningContent} isClosable={false} isYellow />
        <RowGapBlock gap={4}>
          {(!votingOptOutAccounts || !votingOptOutAccounts.length) && <TextBig>No accounts found</TextBig>}
          {votingOptOutAccounts && votingOptOutAccounts.length > 0 && (
            <>
              {/* <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} /> */}

              <h6>Accounts ({votingOptOutAccounts.length})</h6>
              <BlacklistedAccountsList>
                {votingOptOutAccounts.map((address) => (
                  <BlacklistedAccount key={address} address={address} />
                ))}
              </BlacklistedAccountsList>
              {/*<Pagination pageCount={pageCount} handlePageChange={setPage} page={page} /> */}
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`
