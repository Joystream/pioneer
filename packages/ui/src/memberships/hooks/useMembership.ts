import { MemberWithDetailsFragment, useGetMemberQuery } from '../queries'
import { asBlock, asMember, DetailedMember } from '../types'

interface UseMember {
  member?: DetailedMember
  isLoading: boolean
}

export const asMemberWithDetails = (data: MemberWithDetailsFragment): DetailedMember => {
  return {
    ...asMember(data),
    about: '',
    invitedBy: '',
    registeredAtBlock: asBlock(data.registeredAtBlock),
    registeredAtTime: data.registeredAtTime,
    invitees: [],
  }
}

export function useMember(memberId: string): UseMember {
  const options = {
    variables: { id: memberId },
  }

  const { data, loading, error } = useGetMemberQuery(options)

  if (error) {
    console.error(error)
  }

  return { member: data?.membership ? asMemberWithDetails(data.membership) : undefined, isLoading: loading }
}
