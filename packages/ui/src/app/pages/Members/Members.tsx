import React, { useEffect, useReducer, useState } from 'react'

import { MainPanel } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
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
  const [filter, setFilter] = useState(MemberListEmptyFilter)
  const [order, dispatchSort] = useReducer(sortReducer, DefaultMemberListOrder)

  const [page, setPage] = useState(1)
  useEffect(() => {
    setPage(1)
  }, [filter, order])

  const { members, isLoading, pageCount } = useMembers({ order, filter, page })

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Members</PageTitle>
      </PageHeader>
      <MainPanel>
        <MemberListFilters roles={Roles} onApply={setFilter} />
        <MemberList isLoading={isLoading} members={members} order={order} onSort={dispatchSort} />
        {!isLoading && pageCount && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />}
      </MainPanel>
    </AppPage>
  )
}
