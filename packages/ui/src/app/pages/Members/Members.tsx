import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'

import { MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Pagination } from '@/common/components/Pagination'
import { useModal } from '@/common/hooks/useModal'
import { MemberList } from '@/memberships/components/MemberList'
import { MemberListEmptyFilter, MemberListFilters } from '@/memberships/components/MemberListFilters'
import { MemberModalCall } from '@/memberships/components/MemberProfile'
import { DefaultMemberListOrder, MemberListOrder, MemberListSortKey, useMembers } from '@/memberships/hooks/useMembers'

import { AppPage } from '../../components/AppPage'

const sortReducer = (order: MemberListOrder, sortBy: MemberListSortKey): MemberListOrder => ({
  sortBy: sortBy,
  isDescending: sortBy === order.sortBy && !order.isDescending,
})

export const Members = () => {
  const { id } = useParams<{ id?: string }>()
  const { showModal } = useModal()
  useEffect(() => {
    !!id && showModal<MemberModalCall>({ modal: 'Member', data: { id } })
  }, [id])

  const [filter, setFilter] = useState(MemberListEmptyFilter)
  const [order, dispatchSort] = useReducer(sortReducer, DefaultMemberListOrder)

  const [page, setPage] = useState(1)
  useEffect(() => {
    setPage(1)
  }, [filter, order])

  const { members, isLoading, totalCount, pageCount } = useMembers({ order, filter, page })

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Members</PageTitle>
      </PageHeader>
      <MainPanel>
        <MemberListFilters memberCount={totalCount} onApply={setFilter} />
        <MemberList isLoading={isLoading} members={members} order={order} onSort={dispatchSort} />
        {!isLoading && !!pageCount && pageCount > 1 && (
          <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
        )}
      </MainPanel>
    </AppPage>
  )
}
