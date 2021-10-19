import React, { ReactNode, useState } from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Pagination } from '@/common/components/Pagination'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { TextBig } from '@/common/components/typography'
import { PastElectionsList } from '@/council/components/election/PastElectionsList/PastElectionsList'
import { useCandidatePreviewViaUrlParameter } from '@/council/hooks/useCandidatePreviewViaUrlParameter'
import { PastElectionsOrderKey, usePastElections } from '@/council/hooks/usePastElections'
import { PastWorkersList } from '@/working-groups/components/WorkersTableList/PastWorkersList'
import { usePastWorkersPagination, WorkersOrderKey } from '@/working-groups/hooks/usePastWorkersPagination'

import { CouncilTabs } from './components/CouncilTabs'

export interface TableOrder<T> {
  key: T
  isDescending: boolean
}

export const PastElections = () => {
  useCandidatePreviewViaUrlParameter()

  const [page, setPage] = useState(1)
  const [order, setOrder] = useState<TableOrder<PastElectionsOrderKey>>({ key: 'cycle', isDescending: true })
  const { isLoading, elections, pageCount } = usePastElections({
    page,
    isDescending: order.isDescending,
    orderKey: order.key,
  })
  const sort = (sortKey: PastElectionsOrderKey) => {
    setOrder({ key: sortKey, isDescending: sortKey === order.key ? !order.isDescending : true })
  }

  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Past elections</PageTitle>
      </PageHeaderRow>
      <CouncilTabs />
    </PageHeaderWrapper>
  )

  const displayMain = () => {
    return (
      <>
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
        <RowGapBlock gap={4}>
          <ListHeaders $colLayout="1fr 1fr 1fr">
            <SortHeader order={order} sort={sort} sortKey="cycle">
              Round
            </SortHeader>
            <SortHeader order={order} sort={sort} sortKey="cycle">
              Round
            </SortHeader>
            <SortHeader order={order} sort={sort} sortKey="finishedAt">
              Election ended at
            </SortHeader>
          </ListHeaders>
          {isLoading && <Loading />}
          {!isLoading && (!elections || !elections.length) && <TextBig>No elections found</TextBig>}
          {!isLoading && elections && elections.length > 0 && <PastElectionsList elections={elections} />}
        </RowGapBlock>
        <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
      </>
    )
  }

  return <PageLayout header={header} main={displayMain()} />
}

interface SortHeaderProps {
  sortKey: PastElectionsOrderKey
  order: TableOrder<PastElectionsOrderKey>
  children: ReactNode
  sort: (sortKey: PastElectionsOrderKey) => void
}

const SortHeader = ({ sortKey, order, children, sort }: SortHeaderProps) => (
  <ListHeader onClick={() => sort(sortKey)}>
    <HeaderText>
      {children}
      {order.key === sortKey && (order.isDescending ? <SortIconDown /> : <SortIconUp />)}
    </HeaderText>
  </ListHeader>
)
