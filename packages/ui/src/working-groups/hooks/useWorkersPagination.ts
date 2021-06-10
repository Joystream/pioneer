import { useEffect, useMemo, useState } from 'react'

import { getStatusWhere, UseWorkersProps } from '@/working-groups/hooks/useWorkers'
import { useGetWorkersConnectionQuery } from '@/working-groups/queries'
import { asWorkerBaseInfo } from '@/working-groups/types'

export const WORKERS_PER_PAGE = 5

interface UseWorkersPaginationProps extends UseWorkersProps {
  page?: number
}

export const useWorkersPagination = ({ groupId: group_eq, statusIn, page }: UseWorkersPaginationProps) => {
  const variables = {
    where: {
      group_eq,
      status_json: getStatusWhere(statusIn),
    },
    first: page !== undefined ? page * WORKERS_PER_PAGE : undefined,
    last: page !== undefined && page > 1 ? WORKERS_PER_PAGE : undefined,
  }

  const { loading, data } = useGetWorkersConnectionQuery({ variables })
  const [totalCount, setTotalCount] = useState<number>()

  useEffect(() => {
    if (!totalCount && data?.workersConnection.totalCount) {
      setTotalCount(data?.workersConnection.totalCount)
    }
  }, [data])

  const workers = useMemo(
    () =>
      data && data.workersConnection.edges && data.workersConnection.edges.map(({ node }) => asWorkerBaseInfo(node)),
    [data, loading]
  )

  return {
    isLoading: loading,
    workers,
    pageCount: totalCount && Math.ceil(totalCount / WORKERS_PER_PAGE),
  }
}
