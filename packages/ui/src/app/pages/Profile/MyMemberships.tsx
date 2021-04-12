import React from 'react'

import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { AppPage } from '../../components/AppPage'

import { Memberships } from './components/Memberships'
import { MyProfileTabs } from './components/MyProfileTabs'

export const MyMemberships = () => {
  const crumbs = [
    { href: '#', text: 'My Profile' },
    { href: '#', text: 'My Memberships' },
  ]

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>My Profile</PageTitle>
        <MyProfileTabs active="My Memberships" />
      </PageHeader>
      <Memberships />
    </AppPage>
  )
}
