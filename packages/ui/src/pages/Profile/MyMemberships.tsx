import React from 'react'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageHeader } from '../../components/page/PageHeader'
import { PageTab, PageTabActive, PageTabs } from '../../components/page/PageTabs'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { Memberships } from './Memberships'
import { MyProfile, MyProfileContent } from './Profile'

export function MyMemberships() {
  return (
    <Page>
      <SideBar
        crumbs={[
          { href: '#', text: 'My Profile' },
          { href: '#', text: 'My Memberships' },
        ]}
      />
      <PageContent>
        <MyProfile>
          <PageHeader>
            <PageTitle>My profile</PageTitle>
            <PageTabs>
              <PageTab to="/profile">My Accounts</PageTab>
              <PageTabActive to="/profile/memberships">My memberships </PageTabActive>
            </PageTabs>
          </PageHeader>
          <MyProfileContent>
            <Memberships />
          </MyProfileContent>
        </MyProfile>
      </PageContent>
    </Page>
  )
}
