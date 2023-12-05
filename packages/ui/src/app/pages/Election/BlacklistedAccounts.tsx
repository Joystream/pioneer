/* eslint-disable no-console */
import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useVotingOptOutAccounts } from '@/accounts/hooks/useVotingOptOutAccounts'
import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { InfoSymbol } from '@/common/components/icons/symbols'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { TextMedium } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'

import { ElectionTabs } from './components/ElectionTabs'

export const BlacklistedAccounts = () => {
    const votingOptOutAccounts = useVotingOptOutAccounts()
  // const [page, setPage] = useState(1)
  // const { order, getSortProps } = useSort<ElectionRoundOrderByInput>('cycleId')
  // const { isLoading, elections, pageCount } = usePastElections({ page, order })

  useEffect(() => {
    console.log('Accounts ',votingOptOutAccounts)
  },[])

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
        <TextMedium>These accounts are excluded from participating in elections, and cannot be used for voting.</TextMedium>
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
        <Warning
          content={warningContent}
          isClosable={false}
          isYellow
        />
        {/* <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} /> */}
        {/* <ListWrapper gap={4}>
            {(!elections || !elections.length) && <TextBig>No elections found</TextBig>}
            {elections && elections.length > 0 && (
              <>
                <PastElectionsListHeaders $colLayout={PastElectionsColLayout}>
                  <SortHeader {...getSortProps('cycleId')}>Round</SortHeader>
                  <SortHeader {...getSortProps('updatedAt')}>Election ended at</SortHeader>
                  <ListHeader>Total Candidates staked</ListHeader>
                  <ListHeader>Total Votes staked</ListHeader>
                  <ListHeader>Revealed votes</ListHeader>
                  <ListHeader>Total candidates</ListHeader>
                </PastElectionsListHeaders>
                <PastElectionsList elections={elections} />
              </>
            )}
          </ListWrapper>
          <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} /> */}
      </MainPanel>
    )
  }

  return <PageLayout header={header} main={displayMain()} />
}

const Container = styled.div`
display: flex;
gap: 8px;

svg{
    margin: auto 0px;
}
`
