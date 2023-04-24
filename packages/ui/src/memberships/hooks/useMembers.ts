import { MembershipExternalResourceType, MembershipOrderByInput, MembershipWhereInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'
import { error } from '@/common/logger'
import { MemberListFilter } from '@/memberships/components/MemberListFilters'
import { useGetMembersCountQuery, useGetMembersWithDetailsQuery } from '@/memberships/queries'

import { asMemberWithDetails } from '../types'

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

  const { data, loading, error: err } = useGetMembersWithDetailsQuery({ variables })

  if (err) {
    error(err)
  }
  return {
    isLoading: loading,
    members: data?.memberships.map(asMemberWithDetails) ?? [],
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
  | 'controllerAccount_eq'
  | 'rootAccount_eq'
  | 'isCouncilMember_eq'
  | 'isVerified_eq'
  | 'externalResources_some'
>

const filterToGqlInput = ({
  search,
  roles,
  onlyCouncil,
  onlyFounder,
  onlyVerified,
  searchFilter,
}: MemberListFilter): FilterGqlInput => ({
  ...(roles.length ? { roles_some: { groupId_in: roles.map(toString) } } : {}),
  ...(onlyFounder ? { isFoundingMember_eq: true } : {}),
  ...(searchFilter ? searchFilterToGqlInput(searchFilter, search) : {}),
  ...(onlyCouncil ? { isCouncilMember_eq: true } : {}),
  ...(onlyVerified ? { isVerified_eq: true } : {}),
})

const searchFilterToGqlInput = (
  searchFilter: NonNullable<MemberListFilter['searchFilter']>,
  search: MemberListFilter['search']
): MembershipWhereInput => {
  if (!search) {
    return {}
  }
  if (searchFilter === 'Membership') {
    return { handle_contains: search }
  }

  if (searchFilter === 'Membership_ID') {
    return { id_eq: search }
  }

  if (searchFilter === 'Account_Address') {
    return { OR: [{ controllerAccount_eq: search }, { rootAccount_eq: search }] }
  }

  return {
    externalResources_some: {
      type_eq: MembershipExternalResourceType[searchFilter as keyof typeof MembershipExternalResourceType],
      value_contains: search,
    },
  }
}
