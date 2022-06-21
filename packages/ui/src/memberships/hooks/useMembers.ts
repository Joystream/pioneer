import { MembershipExternalResourceType, MembershipOrderByInput, MembershipWhereInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'
import { error } from '@/common/logger'
import { MemberListFilter } from '@/memberships/components/MemberListFilters'
import { useGetMembersCountQuery, useGetMembersQuery } from '@/memberships/queries'

import { asMember } from '../types'

export const MEMBERS_PER_PAGE = 10

interface UseMemberProps {
  order: SortOrder<MembershipOrderByInput>
  filter: MemberListFilter
  perPage?: number
}

export const useMembers = ({ order, filter, perPage = 10 }: UseMemberProps) => {
  const where = filterToGqlInput(filter)
  const { data: connectionData } = useGetMembersCountQuery({ variables: { where } })
  const totalCount = connectionData?.membershipsConnection.totalCount
  const { offset, pagination } = usePagination(MEMBERS_PER_PAGE, totalCount ?? 0, [order, filter])
  const variables = {
    limit: perPage,
    offset,
    where,
    orderBy: toQueryOrderByInput<MembershipOrderByInput>(order),
  }
  const { data, loading, error: err } = useGetMembersQuery({ variables })

  if (err) {
    error(err)
  }

  return {
    isLoading: loading,
    members: data?.memberships.map(asMember) ?? [],
    totalCount,
    pagination,
  }
}

type FilterGqlInput = Pick<
  MembershipWhereInput,
  | 'id_eq'
  | 'roles_some'
  | 'isVerified_eq'
  | 'isFoundingMember_eq'
  | 'handle_contains'
  | 'isCouncilMember_eq'
  | 'metadata'
>

const filterToGqlInput = ({
  search,
  roles,
  council,
  onlyVerified,
  onlyFounder,
  searchFilter,
}: MemberListFilter): FilterGqlInput => ({
  ...(roles.length ? { roles_some: { groupId_in: roles.map(toString) } } : {}),
  ...(council === null ? {} : { isCouncilMember_eq: council }),
  ...(onlyVerified ? { isVerified_eq: true } : {}),
  ...(onlyFounder ? { isFoundingMember_eq: true } : {}),
  ...(searchFilter ? searchFilterToGqlInput(searchFilter, search) : {}),
})

const searchFilterToGqlInput = (
  searchFilter: NonNullable<MemberListFilter['searchFilter']>,
  search: MemberListFilter['search']
): MembershipWhereInput => {
  if (searchFilter === 'Membership') {
    return {
      handle_contains: search,
    }
  } else {
    return {
      metadata: {
        externalResources_some: {
          type_eq: MembershipExternalResourceType[searchFilter as keyof typeof MembershipExternalResourceType],
          value_contains: search,
        },
      },
    }
  }
}
