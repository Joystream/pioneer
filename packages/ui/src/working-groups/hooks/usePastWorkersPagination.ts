import { useMemo } from 'react'

import { WorkerOrderByInput } from '@/common/api/queries'
import { UseWorkersProps } from '@/working-groups/hooks/useWorkers'
import { useGetPastWorkersQuery, useGetWorkersCountQuery } from '@/working-groups/queries'
import { asPastWorker } from '@/working-groups/types'

export const WORKERS_PER_PAGE = 10

export type WorkersOrderKey = 'DateStarted' | 'DateFinished'

interface UsePastWorkersPaginationProps extends UseWorkersProps {
  page?: number
  orderKey: WorkersOrderKey
  isDescending: boolean
}

const getOrderBy = (key: WorkersOrderKey, isDescending: boolean) => {
  if (key === 'DateFinished') {
    return isDescending ? WorkerOrderByInput.UpdatedAtDesc : WorkerOrderByInput.RuntimeIdAsc
  }
  return isDescending ? WorkerOrderByInput.CreatedAtDesc : WorkerOrderByInput.CreatedAtAsc
}

export const usePastWorkersPagination = ({
  groupId: group_eq,
  page = 1,
  orderKey,
  isDescending,
}: UsePastWorkersPaginationProps) => {
  const variables = {
    where: {
      group: { id_eq: group_eq },
      status_json: { isTypeOf_not: 'WorkerStatusActive' },
    },
    orderBy: [getOrderBy(orderKey, isDescending)],
    limit: WORKERS_PER_PAGE,
    offset: (page - 1) * WORKERS_PER_PAGE,
  }

  const { loading: loadingWorkers, data: workersData } = useGetPastWorkersQuery({ variables })
  const { loading: loadingCount, data: countData } = useGetWorkersCountQuery({ variables })

  const workers = useMemo(() => workersData && workersData.workers && workersData.workers.map(asPastWorker), [
    workersData,
    loadingWorkers,
  ])
  const totalCount = countData?.workersConnection.totalCount ?? 0

  return {
    loadingWorkers,
    loadingCount,
    workers,
    pageCount: totalCount && Math.ceil(totalCount / WORKERS_PER_PAGE),
  }
}
