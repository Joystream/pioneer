import { useMemo } from 'react'

import { asMember } from '../../memberships/types'
import { useGetWorkersQuery, WorkerFieldsFragment } from '../queries'

interface UseWorkersProps {
  groupId: string
  fetchPast?: boolean
}

export const useWorkers = ({ groupId, fetchPast }: UseWorkersProps) => {
  const options = { variables: { group_eq: groupId } }
  const { data, loading } = useGetWorkersQuery(options)
  const workers = useMemo(
    () => data && data.workers.filter(getWorkersFilter(fetchPast)).map(({ membership }) => asMember(membership)),
    [data, loading]
  )

  return { workers, isLoading: loading }
}

const isActive = (worker: WorkerFieldsFragment) => worker.status.__typename === 'WorkerStatusActive'

const getWorkersFilter = (fetchPast: boolean | undefined) => {
  return (worker: WorkerFieldsFragment) => isActive(worker) === !fetchPast
}
