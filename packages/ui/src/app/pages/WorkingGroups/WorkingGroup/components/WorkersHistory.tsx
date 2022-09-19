import React from 'react'

import { WorkerOrderByInput } from '@/common/api/queries'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { TextBig } from '@/common/components/typography'
import { useSort } from '@/common/hooks/useSort'
import { PastWorkersList } from '@/working-groups/components/WorkersTableList/PastWorkersList'
import { usePastWorkersPagination } from '@/working-groups/hooks/usePastWorkersPagination'

export const WorkersHistory = ({ groupId }: { groupId: string | undefined }) => {
  const { order, getSortProps } = useSort<WorkerOrderByInput>('updatedAt')
  const { loadingWorkers, loadingCount, workers, pagination } = usePastWorkersPagination({
    groupId,
    order,
  })

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
          <SortHeader {...getSortProps('createdAt')}>Date Started</SortHeader>
          <SortHeader {...getSortProps('updatedAt')}>Date Finished</SortHeader>
        </ListHeaders>
        {loadingWorkers ? <Loading /> : <PastWorkersList workers={workers} />}
      </RowGapBlock>
      <Pagination {...pagination} />
    </>
  )
}

const pastWorkersColLayout = '1fr 1fr 1fr'
