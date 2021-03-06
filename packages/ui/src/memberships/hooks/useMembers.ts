import { error } from '@/common/logger'
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
  totalCount?: number
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
  const { data, loading, error: err } = useGetMembersQuery({ variables })
  const { data: connectionData } = useGetMembersCountQuery({ variables: { where } })

  if (err) {
    error(err)
  }

  const totalCount = connectionData?.membershipsConnection.totalCount

  return {
    isLoading: loading,
    members: data?.memberships.map(asMember) ?? [],
    totalCount,
    pageCount: totalCount && Math.ceil(totalCount / MEMBERS_PER_PAGE),
  }
}

const { CreatedAtAsc, CreatedAtDesc, HandleAsc, HandleDesc } = MembershipOrderByInput
const orderToGqlInput = ({ sortBy, isDescending }: MemberListOrder): MembershipOrderByInput => {
  switch (sortBy) {
    case 'id':
      return isDescending ? CreatedAtDesc : CreatedAtAsc
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
