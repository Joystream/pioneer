import { useMemo } from 'react'

import { useGetWorkersQuery } from '../queries'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { asWorkerWithDetails } from '../types'

export const useMyWorkers = () => {
  const { members } = useMyMemberships()
  const params = { variables: { where: { membershipId_in: members.map((m) => m.id) } } }

  const { data, loading } = useGetWorkersQuery(params)
  const workers = useMemo(() => data && data.workers.map(asWorkerWithDetails), [data, loading])

  return { workers, isLoading: loading }
}
