import React, { useReducer } from 'react'

import { Loading } from '../../../common/components/Loading'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { MemberList, MemberListOrder } from '../../../memberships/components/MemberList'
import { useMembers } from '../../../memberships/hooks/useMembers'
import { AppPage } from '../../components/AppPage'

export const Members = () => {
  const crumbs = [{ href: '#', text: 'Members' }]
  const [order, dispatchSort] = useReducer(
    (order: MemberListOrder, sortBy: MemberListOrder['sortBy']): MemberListOrder => ({
      sortBy: sortBy,
      isDescending: sortBy === order.sortBy && !order.isDescending,
    }),
    { sortBy: 'id', isDescending: false }
  )
  const { members, isLoading } = useMembers()

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Members</PageTitle>
        {isLoading ? <Loading /> : <MemberList members={members} order={order} onSort={dispatchSort} />}
      </PageHeader>
    </AppPage>
  )
}
