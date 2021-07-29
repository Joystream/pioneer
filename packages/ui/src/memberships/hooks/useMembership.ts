import { error } from '@/common/logger'

import { useGetMemberQuery } from '../queries'
import { asMemberWithDetails, DetailedMember } from '../types'

interface UseMember {
  member?: DetailedMember
  isLoading: boolean
}

export function useMember(memberId?: string): UseMember {
  const options = {
    variables: { where: { id: memberId ?? '' } },
  }

  const { data, loading, error: err } = useGetMemberQuery(options)

  if (err) {
    error(err)
  }

  return {
    member: data?.membershipByUniqueInput ? asMemberWithDetails(data.membershipByUniqueInput) : undefined,
    isLoading: loading,
  }
}
