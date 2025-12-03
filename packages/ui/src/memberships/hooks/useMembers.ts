import { MembershipExternalResourceType, MembershipOrderByInput, MembershipWhereInput } from '@/common/api/queries'
import { usePagination } from '@/common/hooks/usePagination'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'
import { error } from '@/common/logger'
import { MemberListFilter } from '@/memberships/components/MemberListFilters'
import { useGetMembersCountQuery, useGetMembersWithDetailsQuery } from '@/memberships/queries'
import { GroupIdToGroupParam } from '@/working-groups/constants'

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
  | 'OR'
>

const groupNameToGroupId = (groupName: string): string | null => {
  const nameToIdMap = Object.entries(GroupIdToGroupParam).reduce((acc, [groupId, displayName]) => {
    acc[displayName] = groupId
    const withSpaces = displayName.replace(/([a-z])([A-Z])/g, '$1 $2')
    if (withSpaces !== displayName) {
      acc[withSpaces] = groupId
    }
    return acc
  }, {} as Record<string, string>)

  return nameToIdMap[groupName] ?? null
}

const filterToGqlInput = ({
  search,
  roles,
  onlyCouncil,
  onlyFounder,
  onlyVerified,
  searchFilter,
}: MemberListFilter): FilterGqlInput => {
  const rolesByGroup = roles.reduce((acc, role) => {
    const groupId = groupNameToGroupId(role.groupName)
    if (!groupId) return acc

    if (!acc[groupId]) {
      acc[groupId] = { hasLead: false, hasWorker: false }
    }

    if (role.isLead) {
      acc[groupId].hasLead = true
    } else {
      acc[groupId].hasWorker = true
    }

    return acc
  }, {} as Record<string, { hasLead: boolean; hasWorker: boolean }>)

  const groupIds = Object.keys(rolesByGroup)
  if (groupIds.length === 0) {
    return {
      ...(onlyFounder ? { isFoundingMember_eq: true } : {}),
      ...(searchFilter ? searchFilterToGqlInput(searchFilter, search) : {}),
      ...(onlyCouncil ? { isCouncilMember_eq: true } : {}),
      ...(onlyVerified ? { isVerified_eq: true } : {}),
    }
  }

  const leadOnlyGroupIds = groupIds.filter(
    (groupId) => rolesByGroup[groupId].hasLead && !rolesByGroup[groupId].hasWorker
  )
  const workerOnlyGroupIds = groupIds.filter(
    (groupId) => rolesByGroup[groupId].hasWorker && !rolesByGroup[groupId].hasLead
  )
  const bothGroupIds = groupIds.filter((groupId) => rolesByGroup[groupId].hasLead && rolesByGroup[groupId].hasWorker)

  const rolesFilters: Array<{ groupId_in: string[]; isLead_eq?: boolean }> = []

  if (bothGroupIds.length > 0) {
    rolesFilters.push({ groupId_in: bothGroupIds })
  }

  if (leadOnlyGroupIds.length > 0) {
    rolesFilters.push({ groupId_in: leadOnlyGroupIds, isLead_eq: true })
  }

  if (workerOnlyGroupIds.length > 0) {
    rolesFilters.push({ groupId_in: workerOnlyGroupIds, isLead_eq: false })
  }

  const rolesFilter =
    rolesFilters.length === 1
      ? { roles_some: rolesFilters[0] }
      : rolesFilters.length > 1
      ? { OR: rolesFilters.map((filter) => ({ roles_some: filter })) }
      : {}

  return {
    ...rolesFilter,
    ...(onlyFounder ? { isFoundingMember_eq: true } : {}),
    ...(searchFilter ? searchFilterToGqlInput(searchFilter, search) : {}),
    ...(onlyCouncil ? { isCouncilMember_eq: true } : {}),
    ...(onlyVerified ? { isVerified_eq: true } : {}),
  }
}

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
