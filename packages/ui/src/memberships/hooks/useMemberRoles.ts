import { useMemo } from 'react'

import { useGetDetailedWorkersQuery } from '@/working-groups/queries'
import { asWorkerWithDetails } from '@/working-groups/types'

export const useMemberRoles = (membershipId: string) => {
  const params = { variables: { where: { membership: { id_eq: membershipId } } } }

  const { data, loading } = useGetDetailedWorkersQuery(params)
  const workers = useMemo(() => (data && data.workers.map(asWorkerWithDetails)) || [], [data, loading])

  return { workers, isLoading: loading }
}
