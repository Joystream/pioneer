import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ButtonsGroup } from '@/common/components/buttons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { AddMembershipButton } from '@/memberships/components/AddMembershipButton'
import { InviteMemberButton } from '@/memberships/components/InviteMemberButton'

import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'

import { Memberships } from './components/Memberships'
import { MyProfileTabs } from './components/MyProfileTabs'

export const MyMemberships = () => (
  <PageLayout
    header={
      <PageHeader>
        <PageTitle>My Profile</PageTitle>
        <MyProfileTabs />
        <ButtonsGroup>
          <InviteMemberButton size="medium">Invite a member</InviteMemberButton>
          <AddMembershipButton size="medium">
            <PlusIcon />
            Add Membership
          </AddMembershipButton>
        </ButtonsGroup>
      </PageHeader>
    }
    main={<Memberships />}
  />
)
