import { useMemo } from 'react'

import { asWorkerBaseInfo, WorkerStatus, WorkerStatusTypename } from '@/working-groups/types'

import { useGetWorkersQuery } from '../queries'

export interface UseWorkersProps {
  groupId?: string
  statusIn?: WorkerStatus[]
}

export const getStatusWhere = (statusIn?: WorkerStatus[]) => {
  if (!statusIn) {
    return
  }

  return { isTypeOf_in: statusIn.map((status) => WorkerStatusTypename[status]) }
}

export const useWorkers = ({ groupId: group_eq, statusIn }: UseWorkersProps) => {
  const variables = {
    where: { group_eq, status_json: getStatusWhere(statusIn) },
  }

  const { data, loading } = useGetWorkersQuery({ variables })
  const workers = useMemo(() => data && data.workers.map(asWorkerBaseInfo), [data, loading])

  return { workers, isLoading: loading }
}
