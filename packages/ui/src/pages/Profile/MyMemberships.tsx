import React from 'react'
import { ButtonPrimary } from '../../components/buttons/Buttons'
import { Page } from '../../components/page/Page'
import { PageContent } from '../../components/page/PageContent'
import { PageTab, PageTabActive, PageTabs } from '../../components/page/PageTabs'
import { PageTitle } from '../../components/page/PageTitle'
import { SideBar } from '../../components/page/SideBar'
import { MyProfile, MyProfileContent, MyProfileHead, ProfileSummary } from './Profile'

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
          { href: '#', text: 'My Mmeberships' },
        ]}
      />
      <PageContent>
        <MyProfile>
          <MyProfileHead>
            <PageTitle>My profile</PageTitle>
            <ProfileSummary>
              <PageTabs>
                <PageTab>My accounts</PageTab>
                <PageTabActive>My memberships</PageTabActive>
              </PageTabs>
            </ProfileSummary>
          </MyProfileHead>
          <MyProfileContent>
            <Memberships />
          </MyProfileContent>
        </MyProfile>
      </PageContent>
    </Page>
  )
}
