import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { MembershipOrderByInput } from '@/common/api/queries'
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

  const { members, isLoading, totalCount, pagination } = useMembers({ order, filter })

  return (
    <PageLayout
      header={<PageHeader title="Members" />}
      main={
        <MainPanel>
          <MemberListFilters
            memberCount={totalCount}
            onApply={(filters) => {
              if (!filters.search) {
                return setFilter({ ...filters, searchFilter: 'Membership' })
              }
              setFilter(filters)
            }}
          />
          <MemberList
            isLoading={isLoading}
            members={members}
            getSortProps={getSortProps}
            searchFilter={filter.searchFilter}
          />
          <Pagination {...pagination} />
        </MainPanel>
      }
    />
  )
}
