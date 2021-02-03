import React from 'react'
import { ButtonPrimary } from '../../components/buttons/Buttons'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageHeader } from '../../components/page/PageHeader'
import { PageTab, PageTabActive, PageTabs } from '../../components/page/PageTabs'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { MyProfile, MyProfileContent } from './Profile'

function Memberships() {
  return (
    <>
      <h2>You have no active membership</h2>
      <p>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
        velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </p>
      <ButtonPrimary>Create membership</ButtonPrimary>
    </>
  )
}

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
