import React from 'react'
import { useHistory } from 'react-router-dom'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageHeader } from '../../components/page/PageHeader'
import { PageTab, PageTabs } from '../../components/page/PageTabs'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { Memberships } from './MyMemberships/Memberships'
import { MyProfile, MyProfileContent } from './Profile'

export function MyMemberships() {
  const history = useHistory()

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
              <PageTab onClick={() => history.push('/profile')}>My accounts</PageTab>
              <PageTab active>My memberships</PageTab>
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
