import { useMemo } from 'react'

import { WorkerOrderByInput } from '@/common/api/queries'
import { toQueryOrderByInput, SortOrder } from '@/common/hooks/useSort'
import { UseWorkersProps } from '@/working-groups/hooks/useWorkers'
import { useGetPastWorkersQuery, useGetWorkersCountQuery } from '@/working-groups/queries'
import { asPastWorker } from '@/working-groups/types'

export const WORKERS_PER_PAGE = 10

interface UsePastWorkersPaginationProps extends UseWorkersProps {
  page?: number
  order: SortOrder<WorkerOrderByInput>
}

export const usePastWorkersPagination = ({ groupId: group_eq, page = 1, order }: UsePastWorkersPaginationProps) => {
  const variables = {
    where: {
      group: { id_eq: group_eq },
      status_json: { isTypeOf_not: 'WorkerStatusActive' },
    },
    orderBy: [toQueryOrderByInput<WorkerOrderByInput>(order)],
    limit: WORKERS_PER_PAGE,
    offset: (page - 1) * WORKERS_PER_PAGE,
  }

  const { loading: loadingWorkers, data: workersData } = useGetPastWorkersQuery({ variables })
  const { loading: loadingCount, data: countData } = useGetWorkersCountQuery({ variables })

  const workers = useMemo(
    () => workersData && workersData.workers && workersData.workers.map(asPastWorker),
    [workersData, loadingWorkers]
  )
  const totalCount = countData?.workersConnection.totalCount ?? 0

  return {
    loadingWorkers,
    loadingCount,
    workers,
    pageCount: totalCount && Math.ceil(totalCount / WORKERS_PER_PAGE),
  }
}
