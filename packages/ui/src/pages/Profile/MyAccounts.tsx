import React from 'react'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageHeader } from '../../components/page/PageHeader'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { Breadcrumbs } from '../../components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { Accounts } from './MyAccounts/Accounts'
import { TotalBalances } from './MyAccounts/TotalBalances'
import { MyProfileTabs } from './MyProfileTabs'
import { MyProfile, MyProfileContent, ProfileSummary } from './Profile'

export function MyAccounts() {
  return (
    <Page>
      <SideBar />
      <PageContent>
        <Breadcrumbs
          crumbs={[
            { href: '#', text: 'My Profile' },
            { href: '#', text: 'My Accounts' },
          ]}
        />
        <MyProfile>
          <PageHeader>
            <PageTitle>My profile</PageTitle>
            <MyProfileTabs />
            <ProfileSummary>
              <TotalBalances />
            </ProfileSummary>
          </PageHeader>
          <MyProfileContent>
            <Accounts />
          </MyProfileContent>
        </MyProfile>
      </PageContent>
    </Page>
  )
}
