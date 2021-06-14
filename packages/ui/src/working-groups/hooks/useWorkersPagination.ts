import { useMemo } from 'react'

import { UseWorkersProps } from '@/working-groups/hooks/useWorkers'
import { getWorkersWhere } from '@/working-groups/hooks/utils/queries'
import { useGetWorkersCountQuery, useGetWorkersQuery } from '@/working-groups/queries'
import { asWorkerBaseInfo } from '@/working-groups/types'

export const WORKERS_PER_PAGE = 10

interface UseWorkersPaginationProps extends UseWorkersProps {
  page?: number
}

export const useWorkersPagination = ({ groupId: group_eq, status, page = 1 }: UseWorkersPaginationProps) => {
  const variables = {
    where: {
      group: { id_eq: group_eq },
      ...getWorkersWhere(status),
    },
    limit: WORKERS_PER_PAGE,
    offset: (page - 1) * WORKERS_PER_PAGE,
  }

  const { loading: loadingWorkers, data: workersData } = useGetWorkersQuery({ variables })
  const { loading: loadingCount, data: countData } = useGetWorkersCountQuery({ variables })

  const workers = useMemo(
    () => workersData && workersData.workers && workersData.workers.map(asWorkerBaseInfo),
    [workersData, loadingWorkers]
  )
  const totalCount = countData?.workersConnection.totalCount ?? 0

  return {
    isLoading: loadingWorkers || loadingCount,
    workers,
    pageCount: totalCount && Math.ceil(totalCount / WORKERS_PER_PAGE),
  }
}
