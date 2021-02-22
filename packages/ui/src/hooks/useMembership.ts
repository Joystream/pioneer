import { useGetMembersQuery } from '../api/queries'

interface UseMembership {
  count: number
}

export function useMembership(): UseMembership {
  const { data } = useGetMembersQuery()

  return { count: data?.members.length ?? 0 }
}
