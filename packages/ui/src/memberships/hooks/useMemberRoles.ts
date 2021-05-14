import { useMemo } from 'react'

import { useGetWorkersQuery } from '@/working-groups/queries'
import { asWorkerWithDetails } from '@/working-groups/types'

export const useMemberRoles = (membershipId: string) => {
  const params = { variables: { where: { membershipId_eq: membershipId } } }

  const { data, loading } = useGetWorkersQuery(params)
  const workers = useMemo(() => (data && data.workers.map(asWorkerWithDetails)) || [], [data, loading])

  return { workers, isLoading: loading }
}
