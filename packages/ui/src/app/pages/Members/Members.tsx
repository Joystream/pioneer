import React, { useReducer, useState } from 'react'

import { MemberListEmptyFilter, MemberListFilters } from '@/memberships/components/MemberListFilters'
import { MemberRolesList } from '@/memberships/components/MemberRoles'

import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { MemberList } from '../../../memberships/components/MemberList'
import {
  MemberListOrder,
  MemberListSortKey,
  DefaultMemberListOrder,
  useMembers,
} from '../../../memberships/hooks/useMembers'
import { AppPage } from '../../components/AppPage'

const sortReducer = (order: MemberListOrder, sortBy: MemberListSortKey): MemberListOrder => ({
  sortBy: sortBy,
  isDescending: sortBy === order.sortBy && !order.isDescending,
})

const Roles = Object.fromEntries(MemberRolesList.map(({ abbreviation }) => [abbreviation, abbreviation]))

export const Members = () => {
  const crumbs = [{ href: '#', text: 'Members' }]
  const [filter, setFilter] = useState(MemberListEmptyFilter)
  const [order, dispatchSort] = useReducer(sortReducer, DefaultMemberListOrder)

  const { members, isLoading } = useMembers({ order, filter })

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Members</PageTitle>
        <MemberListFilters roles={Roles} onApply={setFilter} />
        <MemberList isLoading={isLoading} members={members} order={order} onSort={dispatchSort} />
      </PageHeader>
    </AppPage>
  )
}
