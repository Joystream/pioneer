import React from 'react'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { Memberships } from './MyMemberships/Memberships'
import { MyProfileTabs } from './MyProfileTabs'
import { MyProfile, MyProfileContent } from './Profile'

export const MyMemberships = () => (
  <Page>
    <SideBar
      crumbs={[
        { href: '#', text: 'My Profile' },
        { href: '#', text: 'My Memberships' },
      ]}
    />
    <PageContent>
      <MyProfile>
        <PageTitle>My profile</PageTitle>
        <MyProfileTabs />
        <MyProfileContent>
          <Memberships />
        </MyProfileContent>
      </MyProfile>
    </PageContent>
  </Page>
)
