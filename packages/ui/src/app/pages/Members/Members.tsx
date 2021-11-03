import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { MembershipOrderByInput } from '@/common/api/queries'
import { FilterPageHeader } from '@/common/components/forms/FilterBox'
import { MainPanel } from '@/common/components/page/PageContent'
import { Pagination } from '@/common/components/Pagination'
import { useModal } from '@/common/hooks/useModal'
import { useSort } from '@/common/hooks/useSort'
import { MemberList } from '@/memberships/components/MemberList'
import { MemberListEmptyFilter, MemberListFilters } from '@/memberships/components/MemberListFilters'
import { MemberModalCall } from '@/memberships/components/MemberProfile'
import { useMembers } from '@/memberships/hooks/useMembers'

export const Members = () => {
  const { id } = useParams<{ id?: string }>()
  const { showModal } = useModal()
  useEffect(() => {
    !!id && showModal<MemberModalCall>({ modal: 'Member', data: { id } })
  }, [id])

  const [filter, setFilter] = useState(MemberListEmptyFilter)
  const { order, getSortProps } = useSort<MembershipOrderByInput>('createdAt')
  const searchSlot = useRef<HTMLDivElement>(null)

  const { members, isLoading, totalCount, pagination } = useMembers({ order, filter })

  return (
    <PageLayout
      header={<FilterPageHeader ref={searchSlot} title="Members" />}
      main={
        <MainPanel>
          <MemberListFilters searchSlot={searchSlot} memberCount={totalCount} onApply={setFilter} />
          <MemberList isLoading={isLoading} members={members} getSortProps={getSortProps} />
          <Pagination {...pagination} />
        </MainPanel>
      }
    />
  )
}
