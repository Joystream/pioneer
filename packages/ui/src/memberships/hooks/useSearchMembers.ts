import { error as logError } from '@/common/logger'
import { useSearchMembersQuery } from '@/memberships/queries'
import { Member } from '@/memberships/types'

interface UseSearchMembersProps {
  search: string
  limit: number
  skip?: boolean
}

export const useSearchMembers = ({ search, limit, skip }: UseSearchMembersProps) => {
  const { loading, data, error } = useSearchMembersQuery({ variables: { text: search, limit }, skip })

  if (error) {
    logError(error)
  }

  return {
    isLoading: loading,
    members: data && (data.memberships as unknown as Member[]),
    isSearch: !!search && !loading,
  }
}
