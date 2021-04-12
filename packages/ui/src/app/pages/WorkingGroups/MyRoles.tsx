import React from 'react'

import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { TextBig } from '../../../common/components/typography'
import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const MyRoles = () => {
  const crumbs = [
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'My Roles' },
  ]

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs active="My Roles" />
      </PageHeader>
      <TextBig>My roles</TextBig>
    </AppPage>
  )
}
