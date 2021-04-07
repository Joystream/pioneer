import React from 'react'

import { Page } from '../../../../common/components/page/Page'
import { PageContent } from '../../../../common/components/page/PageContent'
import { PageHeader } from '../../../../common/components/page/PageHeader'
import { PageTitle } from '../../../../common/components/page/PageTitle'
import { SideBar } from '../../../../common/components/page/SideBar'
import { Breadcrumbs } from '../../../../common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { MyProfile, MyMembershipsContent } from '../Components'
import { MyProfileTabs } from '../MyProfileTabs'

import { Memberships } from './Memberships'

export const MyMemberships = () => (
  <Page>
    <SideBar />
    <PageContent>
      <Breadcrumbs
        crumbs={[
          { href: '#', text: 'My Profile' },
          { href: '#', text: 'My Memberships' },
        ]}
      />
      <MyProfile>
        <PageHeader>
          <PageTitle>My profile</PageTitle>
          <MyProfileTabs />
        </PageHeader>
        <MyMembershipsContent>
          <Memberships />
        </MyMembershipsContent>
      </MyProfile>
    </PageContent>
  </Page>
)
