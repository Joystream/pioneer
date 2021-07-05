import { useMemo } from 'react'

import { asWorkerBaseInfo, WorkerStatus, WorkerStatusTypename } from '@/working-groups/types'

import { useGetWorkersQuery } from '../queries'

export interface UseWorkersProps {
  groupId?: string
  status?: WorkerStatus
}

export const getStatusWhere = (status?: WorkerStatus) => {
  if (!status) {
    return
  }

  return { isTypeOf_eq: WorkerStatusTypename[status] }
}

export const useWorkers = ({ groupId: group_eq, status }: UseWorkersProps) => {
  const variables = {
    where: { group: { id_eq: group_eq }, status_json: getStatusWhere(status) },
  }

  const { data, loading } = useGetWorkersQuery({ variables })
  const workers = useMemo(() => data && data.workers.map(asWorkerBaseInfo), [data, loading])

  return { workers, isLoading: loading }
}
