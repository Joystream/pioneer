import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Pagination } from '@/common/components/Pagination'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { TextBig } from '@/common/components/typography'
import { SortOrder } from '@/common/hooks/useSort'
import { PastElectionsList } from '@/council/components/election/pastElection/PastElectionsList/PastElectionsList'
import { PastElectionsOrderKey, usePastElections } from '@/council/hooks/usePastElections'

import { CouncilTabs } from '../components/CouncilTabs'

export const PastElections = () => {
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState<SortOrder<PastElectionsOrderKey>>({ orderKey: 'cycle', isDescending: true })
  const { isLoading, elections, pageCount } = usePastElections({
    page,
    isDescending: order.isDescending,
    orderKey: order.orderKey,
  })
  const sort = (sortKey: PastElectionsOrderKey) => {
    setOrder({ orderKey: sortKey, isDescending: sortKey === order.orderKey ? !order.isDescending : true })
  }

  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Council</PageTitle>
      </PageHeaderRow>
      <CouncilTabs />
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
          <PastElectionsListHeaders $colLayout={PastElectionsColLayout}>
            <SortHeader order={order} sort={sort} sortKey="cycle">
              Round
            </SortHeader>
            <SortHeader order={order} sort={sort} sortKey="finishedAt">
              Election ended at
            </SortHeader>
            <ListHeader>Total staked</ListHeader>
            <ListHeader>Revealed votes</ListHeader>
            <ListHeader>Total candidates</ListHeader>
          </PastElectionsListHeaders>
          {(!elections || !elections.length) && <TextBig>No elections found</TextBig>}
          {elections && elections.length > 0 && <PastElectionsList elections={elections} />}
        </RowGapBlock>
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
      </MainPanel>
    )
  }

  return <PageLayout header={header} main={displayMain()} />
}

export const PastElectionsColLayout = '48px 176px 156px 100px 100px'

interface SortHeaderProps {
  sortKey: PastElectionsOrderKey
  order: SortOrder<PastElectionsOrderKey>
  children: ReactNode
  sort: (sortKey: PastElectionsOrderKey) => void
}

const SortHeader = ({ sortKey, order, children, sort }: SortHeaderProps) => (
  <ListHeader onClick={() => sort(sortKey)}>
    <HeaderText>
      {children}
      {order.orderKey === sortKey && (order.isDescending ? <SortIconDown /> : <SortIconUp />)}
    </HeaderText>
  </ListHeader>
)

const PastElectionsListHeaders = styled(ListHeaders)`
  grid-column-gap: 24px;
`
