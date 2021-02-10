import React from 'react'
import { useHistory } from 'react-router-dom'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageHeader } from '../../components/page/PageHeader'
import { PageTab, PageTabs } from '../../components/page/PageTabs'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { Accounts } from './MyAccounts/Accounts'
import { MyProfile, MyProfileContent, ProfileSummary } from './Profile'
import { TotalBalances } from './MyAccounts/TotalBalances'

export function MyAccounts() {
  const history = useHistory()

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
          <PageHeader>
            <PageTitle>My profile</PageTitle>
            <PageTabs>
              <PageTab active onClick={() => history.push('/profile')}>
                My accounts
              </PageTab>
              {IS_DEVELOPMENT && <PageTab onClick={() => history.push('/profile/memberships')}>My memberships</PageTab>}
            </PageTabs>
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
