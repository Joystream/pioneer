import { useMemo } from 'react'

import { getWorkersWhere } from '@/working-groups/hooks/utils/queries'
import { asWorkerBaseInfo, WorkerStatus } from '@/working-groups/types'

import { useGetWorkersQuery } from '../queries'

export interface UseWorkersProps {
  groupId?: string
  status?: WorkerStatus
}

export const useWorkers = ({ groupId: group_eq, status }: UseWorkersProps) => {
  const variables = {
    where: {
      group: { id_eq: group_eq },
      ...getWorkersWhere(status),
    },
  }

  const { data, loading } = useGetWorkersQuery({ variables })
  const workers = useMemo(() => data && data.workers.map(asWorkerBaseInfo), [data, loading])

  return { workers, isLoading: loading }
}
