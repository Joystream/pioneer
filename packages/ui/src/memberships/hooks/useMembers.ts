import { MembershipOrderByInput } from '../../common/api/queries'
import { useGetMembersQuery } from '../queries'
import { asMember, Member } from '../types'

export type MemberListSortKey = 'id' | 'handle'
export interface MemberListOrder {
  sortBy: MemberListSortKey
  isDescending: boolean
}

interface UseMemberProps {
  order: MemberListOrder
}
interface UseMembers {
  isLoading: boolean
  members: Member[]
}

export const useMembers = ({ order, filter }: UseMemberProps): UseMembers => {
  const { data, loading, error } = useGetMembersQuery({
    variables: { orderBy: orderToGqlInput(order) },
  })

  if (error) {
    console.error(error)
  }

  return {
    isLoading: loading,
    members: data?.memberships.map(asMember) ?? [],
  }
}

const { EntryAsc, EntryDesc, HandleAsc, HandleDesc } = MembershipOrderByInput
const orderToGqlInput = ({ sortBy, isDescending }: MemberListOrder): MembershipOrderByInput => {
  switch (sortBy) {
    case 'id':
      return isDescending ? EntryDesc : EntryAsc
    case 'handle':
      return isDescending ? HandleDesc : HandleAsc
  }

  throw new Error(`Unsupported sort key: "${sortBy}" for Member Order`)
}
