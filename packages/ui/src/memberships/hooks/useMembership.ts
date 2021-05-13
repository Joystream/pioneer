import { asBlock } from '@/common/types'
import { MemberWithDetailsFragment, useGetMemberQuery } from '../queries'
import { asMember, DetailedMember } from '../types'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'
import { WorkerWithDetails } from '@/working-groups/types'

interface UseMember {
  member?: DetailedMember
  isLoading: boolean
}

export const asMemberWithDetails = (data: MemberWithDetailsFragment, roles: WorkerWithDetails[]): DetailedMember => {
  return {
    ...asMember(data),
    about: '',
    invitedBy: '',
    registeredAtBlock: asBlock(data.registeredAtBlock),
    invitees: [],
    roles: roles.filter((role) => role.status === 'WorkerStatusActive'),
  }
}

export function useMember(memberId?: string): UseMember {
  const options = {
    variables: { where: { id: memberId ?? '' } },
  }

  const { workers } = useMyWorkers()
  const { data, loading, error } = useGetMemberQuery(options)

  if (error) {
    console.error(error)
  }

  return {
    member: data?.membershipByUniqueInput ? asMemberWithDetails(data.membershipByUniqueInput, workers) : undefined,
    isLoading: loading,
  }
}
