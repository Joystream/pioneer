import { MemberFieldsFragment, useGetMembersQuery } from '../api/queries'

interface UseMembership {
  count: number
  members: MemberFieldsFragment[]
}

export function useMembership(): UseMembership {
  const { data } = useGetMembersQuery()

  const count = data?.members.length ?? 0
  const members = data?.members ?? []

  console.log(count, members)

  return { count, members }
}
