import React from 'react'
import styled from 'styled-components'
import { ButtonGhost, ButtonPrimary, ButtonSecondary, ButtonsGroup } from '../../components/buttons/Buttons'
import { TransferIcon } from '../../components/icons'
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
          <ButtonsTest>
            <ButtonsGroup>
              <ButtonPrimary square>
                <TransferIcon />
              </ButtonPrimary>
              <ButtonPrimary square size="medium">
                <TransferIcon />
              </ButtonPrimary>
              <ButtonPrimary square size="small">
                <TransferIcon />
              </ButtonPrimary>
            </ButtonsGroup>
            <ButtonsGroup>
              <ButtonSecondary square>
                <TransferIcon />
              </ButtonSecondary>
              <ButtonSecondary square size="medium">
                <TransferIcon />
              </ButtonSecondary>
              <ButtonSecondary square size="small">
                <TransferIcon />
              </ButtonSecondary>
            </ButtonsGroup>
            <ButtonsGroup>
              <ButtonGhost square>
                <TransferIcon />
              </ButtonGhost>
              <ButtonGhost square size="medium">
                <TransferIcon />
              </ButtonGhost>
              <ButtonGhost square size="small">
                <TransferIcon />
              </ButtonGhost>
            </ButtonsGroup>
          </ButtonsTest>
        </MyProfile>
      </PageContent>
    </Page>
  )
}

const ButtonsTest = styled.div`
  display: grid;
  grid-row-gap: 24px;
  width: 100%;
`
