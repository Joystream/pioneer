import React from 'react'

import { Loading } from '../../../common/components/Loading'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { MemberList } from '../../../memberships/components/MemberList'
import { useMembers } from '../../../memberships/hooks/useMembers'
import { AppPage } from '../../components/AppPage'

export const Members = () => {
  const crumbs = [{ href: '#', text: 'Members' }]
  const { members, isLoading } = useMembers()

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Members</PageTitle>
        {isLoading ? <Loading /> : <MemberList members={members} />}
      </PageHeader>
    </AppPage>
  )
}
