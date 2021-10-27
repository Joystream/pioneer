import React, { ReactNode, useState } from 'react'

import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { TextBig } from '@/common/components/typography'
import { SortOrder } from '@/common/hooks/useSort'
import { PastWorkersList } from '@/working-groups/components/WorkersTableList/PastWorkersList'
import { usePastWorkersPagination, WorkersOrderKey } from '@/working-groups/hooks/usePastWorkersPagination'

export const WorkersHistory = ({ groupId }: { groupId: string | undefined }) => {
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState<SortOrder<WorkersOrderKey>>({ orderKey: 'DateFinished', isDescending: true })

  const { loadingWorkers, loadingCount, workers, pageCount } = usePastWorkersPagination({
    groupId,
    page,
    isDescending: order.isDescending,
    orderKey: order.orderKey,
  })

  const sort = (sortKey: WorkersOrderKey) => {
    if (sortKey === order.orderKey) {
      setOrder({ orderKey: sortKey, isDescending: !order.isDescending })
    } else {
      setOrder({ orderKey: sortKey, isDescending: true })
    }
  }

  if (loadingWorkers && loadingCount) {
    return <Loading />
  }

  if (!workers?.length && !loadingWorkers) {
    return <TextBig>No workers found</TextBig>
  }

  return (
    <>
      <RowGapBlock gap={4}>
        <ListHeaders $colLayout={pastWorkersColLayout}>
          <ListHeader>Worker</ListHeader>
          <SortHeader order={order} sort={sort} sortKey="DateStarted">
            Date Started
          </SortHeader>
          <SortHeader order={order} sort={sort} sortKey="DateFinished">
            Date Finished
          </SortHeader>
        </ListHeaders>
        {loadingWorkers ? <Loading /> : <PastWorkersList workers={workers} />}
      </RowGapBlock>
      <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
    </>
  )
}
const pastWorkersColLayout = '1fr 1fr 1fr'

interface SortHeaderProps {
  sortKey: WorkersOrderKey
  order: SortOrder<WorkersOrderKey>
  children: ReactNode
  sort: (sortKey: WorkersOrderKey) => void
}

const SortHeader = ({ sortKey, order, children, sort }: SortHeaderProps) => (
  <ListHeader onClick={() => sort(sortKey)}>
    <HeaderText>
      {children}
      {order.orderKey === sortKey && (order.isDescending ? <SortIconDown /> : <SortIconUp />)}
    </HeaderText>
  </ListHeader>
)
