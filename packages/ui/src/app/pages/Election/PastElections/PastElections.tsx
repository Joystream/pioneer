import React, { useState } from 'react'
import styled from 'styled-components'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ElectionRoundOrderByInput } from '@/common/api/queries'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Loading } from '@/common/components/Loading'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Pagination } from '@/common/components/Pagination'
import { TextBig } from '@/common/components/typography'
import { useSort } from '@/common/hooks/useSort'
import { PastElectionsList } from '@/council/components/election/pastElection/PastElectionsList/PastElectionsList'
import { usePastElections } from '@/council/hooks/usePastElections'

import { ElectionTabs } from '../components/ElectionTabs'

export const PastElections = () => {
  const [page, setPage] = useState(1)
  const { order, getSortProps } = useSort<ElectionRoundOrderByInput>('cycleId')
  const { isLoading, elections, pageCount } = usePastElections({ page, order })

  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Elections</PageTitle>
      </PageHeaderRow>
      <ElectionTabs />
    </PageHeaderWrapper>
  )

  const displayMain = () => {
    if (isLoading) {
      return (
        <MainPanel>
          <Loading />
        </MainPanel>
      )
    }

    return (
      <MainPanel>
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
        <RowGapBlock gap={4}>
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
        </RowGapBlock>
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
      </MainPanel>
    )
  }

  return <PageLayout header={header} main={displayMain()} />
}

export const PastElectionsColLayout = '48px 176px 140px 140px 100px 100px'

const PastElectionsListHeaders = styled(ListHeaders)`
  grid-column-gap: 24px;
`
