import { useMemo } from 'react'

import { WorkerWhereInput } from '@/common/api/queries'
import { useGetRoleAccountsQuery } from '@/working-groups/queries'

type UseRoleAccount = { roleAccount: string | undefined; isLoading: boolean }

export const useRoleAccount = (where: WorkerWhereInput): UseRoleAccount => {
  const { data, loading } = useGetRoleAccountsQuery({ variables: { where } })
  const roleAccount = useMemo(() => data?.workers.at(0)?.roleAccount, [data, loading])

  return { roleAccount, isLoading: loading }
}
