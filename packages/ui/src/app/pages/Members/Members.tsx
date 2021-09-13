import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { MainPanel } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { useModal } from '@/common/hooks/useModal'
import { MemberList } from '@/memberships/components/MemberList'
import { MemberListEmptyFilter, MemberListFilters } from '@/memberships/components/MemberListFilters'
import { MemberModalCall } from '@/memberships/components/MemberProfile'
import { DefaultMemberListOrder, MemberListOrder, MemberListSortKey, useMembers } from '@/memberships/hooks/useMembers'

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
  const searchSlot = useRef<HTMLDivElement>(null)

  const [page, setPage] = useState(1)
  useEffect(() => {
    setPage(1)
  }, [filter, order])

  const { members, isLoading, totalCount, pageCount } = useMembers({ order, filter, page })

  return (
    <PageLayout
      header={<FilterPageHeader ref={searchSlot} title="Members" />}
      main={
        <MainPanel>
          <MemberListFilters searchSlot={searchSlot} memberCount={totalCount} onApply={setFilter} />
          <MemberList isLoading={isLoading} members={members} order={order} onSort={dispatchSort} />
          {!isLoading && !!pageCount && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />}
        </MainPanel>
      }
    />
  )
}
