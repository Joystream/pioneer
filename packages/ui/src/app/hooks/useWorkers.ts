import { useMemo } from 'react'

import { asMember } from '../../memberships/types'
import { useGetWorkersQuery } from '../../working-groups/queries'

export const useWorkers = (groupId: string) => {
  const options = { variables: { group_eq: groupId } }
  const { data, loading } = useGetWorkersQuery(options)
  const workers = useMemo(() => data && data.workers.map(({ membership }) => asMember(membership)), [data, loading])

  return { workers, isLoading: loading }
}
