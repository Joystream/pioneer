import { useMemo } from 'react'

import { WorkerOrderByInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { toQueryOrderByInput, SortOrder } from '@/common/hooks/useSort'
import { UseWorkersProps } from '@/working-groups/hooks/useWorkers'
import { useGetPastWorkersQuery, useGetWorkersCountQuery } from '@/working-groups/queries'
import { asPastWorker } from '@/working-groups/types'

export const WORKERS_PER_PAGE = 10

interface UsePastWorkersPaginationProps extends UseWorkersProps {
  perPage?: number
  order: SortOrder<WorkerOrderByInput>
}

export const usePastWorkersPagination = ({
  groupId: group_eq,
  perPage = WORKERS_PER_PAGE,
  order,
}: UsePastWorkersPaginationProps) => {
  const variables = {
    where: {
      group: { id_eq: group_eq },
      status_json: { isTypeOf_not: 'WorkerStatusActive' },
    },
    orderBy: [toQueryOrderByInput<WorkerOrderByInput>(order)],
  }

  const { loading: loadingCount, data: countData } = useGetWorkersCountQuery({ variables })
  const totalCount = countData?.workersConnection.totalCount ?? 0
  const { offset, pagination } = usePagination(perPage, totalCount, [order])

  const { loading: loadingWorkers, data: workersData } = useGetPastWorkersQuery({
    variables: {
      ...variables,
      offset,
      limit: perPage,
    },
  })

  const workers = useMemo(
    () => workersData && workersData.workers && workersData.workers.map(asPastWorker),
    [workersData, loadingWorkers]
  )

  return {
    loadingWorkers,
    loadingCount,
    workers,
    pagination,
  }
}
