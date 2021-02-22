import { MemberFieldsFragment, useGetMembersQuery } from '../api/queries'

interface UseMembership {
  count: number
  members: MemberFieldsFragment[]
  loading: boolean
}

export function useMembership(): UseMembership {
  const { data, loading } = useGetMembersQuery()

  const count = data?.members.length ?? 0
  const members = data?.members ?? []

  return { count, members, loading }
}
