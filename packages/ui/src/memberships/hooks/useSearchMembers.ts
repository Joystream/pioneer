import { error as logError } from '@/common/logger'
import { useSearchMembersQuery } from '@/memberships/queries'
import { Member } from '@/memberships/types'

export const useSearchMembers = ({ search, limit }: { search: string; limit: number }) => {
  const { loading, data, error } = useSearchMembersQuery({ variables: { text: search, limit } })

  if (error) {
    logError(error)
  }

  return {
    isLoading: loading,
    members: data && (data.memberships as unknown as Member[]),
    isSearch: !!search && !loading,
  }
}
