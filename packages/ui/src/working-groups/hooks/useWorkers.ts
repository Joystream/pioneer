import { useMemo } from 'react'

import { asMember } from '@/memberships/types'

import { useGetWorkersQuery, WorkerFieldsFragment } from '../queries'

interface UseWorkersProps {
  groupId?: string
  statusIn?: Status[]
}

export const useWorkers = ({ groupId, statusIn }: UseWorkersProps) => {
  const options = { variables: { where: { groupId_eq: groupId } } }
  const { data, loading } = useGetWorkersQuery(options)
  const workers = useMemo(
    () => data && data.workers.filter(getWorkersFilter(statusIn)).map(({ membership }) => asMember(membership)),
    [data, loading]
  )

  return { workers, isLoading: loading }
}

type WorkerStatus = WorkerFieldsFragment['status']['__typename']
type Status = 'active' | 'left' | 'terminated'
const StatusTypename: Record<Status, WorkerStatus> = {
  active: 'WorkerStatusActive',
  left: 'WorkerStatusLeft',
  terminated: 'WorkerStatusTerminated',
}

export const getWorkersFilter = (statusIn?: Status[]) => {
  const statusTypeIn = statusIn?.map((status) => StatusTypename[status]) ?? ['WorkerStatusActive']
  return (worker: WorkerFieldsFragment) => statusTypeIn.includes(worker.status.__typename)
}
