import React, { useReducer } from 'react'

import { Loading } from '../../../common/components/Loading'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { MemberList } from '../../../memberships/components/MemberList'
import { MemberListOrder, MemberListSortKey, useMembers } from '../../../memberships/hooks/useMembers'
import { AppPage } from '../../components/AppPage'

const sortReducer = (order: MemberListOrder, sortBy: MemberListSortKey): MemberListOrder => ({
  sortBy: sortBy,
  isDescending: sortBy === order.sortBy && !order.isDescending,
})

export const Members = () => {
  const crumbs = [{ href: '#', text: 'Members' }]
  const [order, dispatchSort] = useReducer(sortReducer, { sortBy: 'id', isDescending: false })

  const { members, isLoading } = useMembers({ order })

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Members</PageTitle>
        {isLoading ? <Loading /> : <MemberList members={members} order={order} onSort={dispatchSort} />}
      </PageHeader>
    </AppPage>
  )
}
