import React from 'react'

import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { AppPage } from '../../components/AppPage'

export const Members = () => {
  const crumbs = [{ href: '#', text: 'Members' }]

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Members</PageTitle>
      </PageHeader>
    </AppPage>
  )
}
