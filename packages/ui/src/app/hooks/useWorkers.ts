import { useMemo } from 'react'

import { asMember } from '../../memberships/types'
import { useGetWorkersQuery } from '../../working-groups/queries'

export function useWorkers(groupId: string) {
  const options = { variables: { group_eq: groupId } }
  const { data, loading } = useGetWorkersQuery(options)
  const workers = useMemo(() => data && data.workers.map((w) => asMember(w.membership)), [data, loading])
  return { workers, isLoading: loading }
}
