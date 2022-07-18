import { error } from '@/common/logger'

import { useGetMemberQuery } from '../queries'
import { asMemberWithDetails, MemberWithDetails } from '../types'

interface UseMember {
  member?: MemberWithDetails
  isLoading: boolean
}

export function useMember(memberId?: string): UseMember {
  const options = {
    variables: { where: { id: memberId ?? '' } },
    skip: !memberId,
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
