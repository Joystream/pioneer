import { MemberListFilter } from '@/memberships/components/MemberListFilters'
import { useGetMembersCountQuery, useGetMembersQuery } from '@/memberships/queries'

import { MembershipOrderByInput, MembershipWhereInput } from '../../common/api/queries'
import { asMember, Member } from '../types'

export type MemberListSortKey = 'id' | 'handle'
export interface MemberListOrder {
  sortBy: MemberListSortKey
  isDescending: boolean
}

export const DefaultMemberListOrder: MemberListOrder = { sortBy: 'id', isDescending: false }

export const MEMBERS_PER_PAGE = 10

interface UseMemberProps {
  order: MemberListOrder
  filter: MemberListFilter
  page?: number
}
interface UseMembers {
  isLoading: boolean
  members: Member[]
  pageCount?: number
}

export const useMembers = ({ order, filter, page = 1 }: UseMemberProps): UseMembers => {
  const where = filterToGqlInput(filter)
  const variables = {
    limit: MEMBERS_PER_PAGE,
    offset: (page - 1) * MEMBERS_PER_PAGE,
    where,
    orderBy: orderToGqlInput(order),
  }
  const { data, loading, error } = useGetMembersQuery({ variables })
  const { data: connectionData } = useGetMembersCountQuery({ variables: { where, pageSize: MEMBERS_PER_PAGE } })

  if (error) {
    console.error(error)
  }

  return {
    isLoading: loading,
    members: data?.memberships.map(asMember) ?? [],
    pageCount: Math.ceil((connectionData?.membershipsConnection.totalCount ?? 0) / MEMBERS_PER_PAGE),
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
