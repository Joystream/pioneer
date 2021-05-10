import { MemberListFilter } from '@/memberships/components/MemberListFilters'
import { useGetMembershipsConnectionQuery } from '@/memberships/queries'

import { MembershipOrderByInput, MembershipWhereInput } from '../../common/api/queries'
import { asMember, Member } from '../types'

export type MemberListSortKey = 'id' | 'handle'
export interface MemberListOrder {
  sortBy: MemberListSortKey
  isDescending: boolean
}

export const DefaultMemberListOrder: MemberListOrder = { sortBy: 'id', isDescending: false }

interface UseMemberProps {
  order: MemberListOrder
  filter: MemberListFilter
}
interface UseMembers {
  isLoading: boolean
  members: Member[]
}

export const useMembers = ({ order, filter }: UseMemberProps): UseMembers => {
  const variables = {
    where: filterToGqlInput(filter),
    orderBy: orderToGqlInput(order),
  }

  const { data, loading, error } = useGetMembershipsConnectionQuery({
    variables,
  })

  if (error) {
    console.error(error)
  }

  return {
    isLoading: loading,
    members: data?.membershipsConnection.edges.map(({ node }) => asMember(node)) ?? [],
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

type FilterGqlInput = Pick<MembershipWhereInput, 'id_eq' | 'isVerified_eq' | 'isFoundingMember_eq' | 'handle_contains'>

const filterToGqlInput = ({ search, onlyVerified, onlyFounder }: MemberListFilter): FilterGqlInput => ({
  ...(search ? { handle_contains: search } : {}),
  ...(onlyVerified ? { isVerified_eq: true } : {}),
  ...(onlyFounder ? { isFoundingMember_eq: true } : {}),
})
