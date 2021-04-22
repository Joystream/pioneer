import { useMemo } from 'react'

import { asMember } from '../../memberships/types'
import { useGetWorkersQuery, WorkerFieldsFragment } from '../queries'

export const useWorkers = (groupId: string, active = true) => {
  const options = { variables: { group_eq: groupId } }
  const { data, loading } = useGetWorkersQuery(options)
  const workers = useMemo(
    () => data && data.workers.filter(getWorkersFilter(active)).map(({ membership }) => asMember(membership)),
    [data, loading]
  )

  return { workers, isLoading: loading }
}

const isActive = (worker: WorkerFieldsFragment) => worker.status.__typename === 'WorkerStatusActive'

const getWorkersFilter = (activeStatus: boolean) => {
  return (worker: WorkerFieldsFragment) => isActive(worker) === activeStatus
}
