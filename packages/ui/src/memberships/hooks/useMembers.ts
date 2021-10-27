import { getSortFromEnum, SortOrder } from '@/common/hooks/useSort'
import { error } from '@/common/logger'
import { MemberListFilter } from '@/memberships/components/MemberListFilters'
import { useGetMembersCountQuery, useGetMembersQuery } from '@/memberships/queries'

import { MembershipOrderByInput, MembershipWhereInput } from '../../common/api/queries'
import { asMember, Member } from '../types'

export const MEMBERS_PER_PAGE = 10

interface UseMemberProps {
  order: SortOrder<MembershipOrderByInput>
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
    orderBy: getSortFromEnum<MembershipOrderByInput>(order),
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

type FilterGqlInput = Pick<MembershipWhereInput, 'id_eq' | 'isVerified_eq' | 'isFoundingMember_eq' | 'handle_contains'>

const filterToGqlInput = ({ search, onlyVerified, onlyFounder }: MemberListFilter): FilterGqlInput => ({
  ...(search ? { handle_contains: search } : {}),
  ...(onlyVerified ? { isVerified_eq: true } : {}),
  ...(onlyFounder ? { isFoundingMember_eq: true } : {}),
})
