import { useMemo } from 'react'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { useGetWorkersQuery } from '../queries'
import { asWorker } from '../types'

export const useMyWorkers = () => {
  const { members } = useMyMemberships()
  const params = { variables: { where: { membership_in: members.map((m) => m.id) } } }

  const { data, loading } = useGetWorkersQuery(params)
  const workers = useMemo(() => (data && data.workers.map(asWorker)) || [], [data, loading])

  return { workers, isLoading: loading }
}
