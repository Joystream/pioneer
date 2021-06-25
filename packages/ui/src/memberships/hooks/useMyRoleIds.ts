import { useMemo } from 'react'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useGetWorkerIdsQuery } from '@/working-groups/queries'

export const useMyRoleIds = () => {
  const { active } = useMyMemberships()
  const { data, loading } = active
    ? useGetWorkerIdsQuery({ variables: { where: { membership_eq: active.id } } })
    : { data: undefined, loading: false }
  const workerIds = useMemo(() => data?.workers.map((worker) => worker.id) ?? [], [data, loading])
  return {
    isLoading: loading,
    workerIds,
  }
}
