import { useGetMembersQuery } from '../queries'
import { asMember, Member } from '../types'

interface UseWorkingGroups {
  isLoading: boolean
  members: Member[]
}

export const useMembers = (): UseWorkingGroups => {
  const { data, loading, error } = useGetMembersQuery()

  if (error) {
    console.error(error)
  }

  return {
    isLoading: loading,
    members: data?.memberships.map(asMember) ?? [],
  }
}
