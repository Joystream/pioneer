import { useMemo } from 'react'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { useGetWorkersQuery } from '../queries'
import { asWorkerWithDetails } from '../types'

export const useMyWorkers = () => {
  const { members } = useMyMemberships()
  const params = { variables: { where: { membershipId_in: members.map((m) => m.id) } } }

  const { data, loading } = useGetWorkersQuery(params)
  console.log(data)
  const workers = useMemo(() => (data && data.workers.map(asWorkerWithDetails)) || [], [data, loading])

  return { workers, isLoading: loading }
}
