import React from 'react'

import { PageLayout, PageHeaderWrapper } from '@/app/components/PageLayout'
import { ButtonsGroup } from '@/common/components/buttons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { AddMembershipButton } from '@/memberships/components/AddMembershipButton'
import { InviteMemberButton } from '@/memberships/components/InviteMemberButton'

import { PageTitle } from '../../../common/components/page/PageTitle'

import { Memberships } from './components/Memberships'
import { MyProfileTabs } from './components/MyProfileTabs'

export const MyMemberships = () => (
  <PageLayout
    header={
      <PageHeaderWrapper>
        <PageTitle>My Profile</PageTitle>
        <MyProfileTabs />
        <ButtonsGroup>
          <InviteMemberButton size="medium">Invite a member</InviteMemberButton>
          <AddMembershipButton size="medium">
            <PlusIcon />
            Add Membership
          </AddMembershipButton>
        </ButtonsGroup>
      </PageHeaderWrapper>
    }
    main={<Memberships />}
  />
)
