import { useMemo } from 'react'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useGetWorkerIdsQuery } from '@/working-groups/queries'

export const useMyRoleIds = () => {
  const { active } = useMyMemberships()
  const { data, loading } = useGetWorkerIdsQuery({ variables: { where: { membership: { id_eq: active?.id } } } })
  const workerIds = useMemo(() => data?.workers.map((worker) => worker.id) ?? [], [data, loading, active?.id])

  return {
    isLoading: loading,
    workerIds: active ? workerIds : [],
  }
}
