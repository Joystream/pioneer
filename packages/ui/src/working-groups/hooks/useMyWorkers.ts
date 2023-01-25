import { useMemo } from 'react'

import { whenDefined } from '@/common/utils'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { useGetWorkersQuery } from '../queries'
import { asWorker } from '../types'

export const useMyWorkers = () => {
  const { members, active } = useMyMemberships()
  const params = {
    variables: {
      where: { membership: { id_in: whenDefined(active?.id, (id) => [id]) ?? members.map((members) => members.id) } },
    },
  }

  const { data, loading } = useGetWorkersQuery(params)

  const workers = useMemo(() => (data && data.workers.map(asWorker)) || [], [data, loading])

  return { workers, isLoading: loading }
}
