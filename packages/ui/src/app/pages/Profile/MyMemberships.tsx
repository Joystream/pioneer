import React from 'react'

import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { AppPage } from '../../components/AppPage'

import { Memberships } from './components/Memberships'
import { MyProfileTabs } from './components/MyProfileTabs'

export const MyMemberships = () => (
  <AppPage>
    <PageHeader>
      <PageTitle>My Profile</PageTitle>
      <MyProfileTabs />
    </PageHeader>
    <Memberships />
  </AppPage>
)
