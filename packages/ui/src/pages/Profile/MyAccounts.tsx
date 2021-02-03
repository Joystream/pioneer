import React from 'react'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageTab, PageTabActive, PageTabs } from '../../components/page/PageTabs'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { Accounts } from './Accounts'
import { MyProfile, MyProfileContent, MyProfileHead, ProfileSummary } from './Profile'
import { TotalBalances } from './TotalBalances'

export function MyAccounts() {
  return (
    <Page>
      <SideBar
        crumbs={[
          { href: '#', text: 'My Profile' },
          { href: '#', text: 'My Accounts' },
        ]}
      />
      <PageContent>
        <MyProfile>
          <MyProfileHead>
            <PageTitle>My profile</PageTitle>
            <ProfileSummary>
              <PageTabs>
                <PageTabActive>My accounts</PageTabActive>
                <PageTab>My memberships</PageTab>
              </PageTabs>
              <TotalBalances />
            </ProfileSummary>
          </MyProfileHead>
          <MyProfileContent>
            <Accounts />
          </MyProfileContent>
        </MyProfile>
      </PageContent>
    </Page>
  )
}
