import { MemberListFilter } from '@/memberships/components/MemberListFilters'

import { MembershipOrderByInput } from '../../common/api/queries'
import { useFilterMembersQuery, FilterMembersQueryVariables } from '../queries'
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
  const { data, loading, error } = useFilterMembersQuery({
    variables: {
      ...filterToGqlInput(filter),
      orderBy: orderToGqlInput(order),
    },
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

type FilterGqlInput = Pick<FilterMembersQueryVariables, 'id' | 'search' | 'isVerified' | 'isFoundingMember'>
const filterToGqlInput = ({ search, onlyVerified, onlyFounder }: MemberListFilter): FilterGqlInput => ({
  ...(search ? (/^#\d+$/.test(search) ? { id: search.slice(1) } : { search }) : {}),
  ...(onlyVerified ? { isVerified: true } : {}),
  ...(onlyFounder ? { isFoundingMember: true } : {}),
})
