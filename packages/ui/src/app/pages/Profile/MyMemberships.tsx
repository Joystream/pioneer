import React from 'react'

import { ButtonsGroup } from '@/common/components/buttons'
import { AddMembershipButton } from '@/memberships/components/AddMembershipButton'
import { InviteMemberButton } from '@/memberships/components/InviteMemberButton'

import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { AppPage } from '../../components/AppPage'

import { Memberships } from './components/Memberships'
import { MyProfileTabs } from './components/MyProfileTabs'

export const MyMemberships = () => (
  <AppPage>
    <PageHeader>
      <PageTitle>My Profile</PageTitle>
      <MyProfileTabs />
      <ButtonsGroup>
        <InviteMemberButton size="medium">Invite a member</InviteMemberButton>
        <AddMembershipButton size="medium">Add Membership</AddMembershipButton>
      </ButtonsGroup>
    </PageHeader>
    <Memberships />
  </AppPage>
)
