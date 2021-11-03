import React from 'react'

import { PageLayout, PageHeaderWrapper, PageHeaderRow } from '@/app/components/PageLayout'
import { ButtonsGroup } from '@/common/components/buttons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { PageTitle } from '@/common/components/page/PageTitle'
import { AddMembershipButton } from '@/memberships/components/AddMembershipButton'
import { InviteMemberButton } from '@/memberships/components/InviteMemberButton'

import { Memberships } from './components/Memberships'
import { MyProfileTabs } from './components/MyProfileTabs'

export const MyMemberships = () => (
  <PageLayout
    header={
      <PageHeaderWrapper>
        <PageHeaderRow>
          <PageTitle>My Profile</PageTitle>
          <ButtonsGroup>
            <InviteMemberButton size="medium">Invite a member</InviteMemberButton>
            <AddMembershipButton size="medium">
              <PlusIcon />
              Add Membership
            </AddMembershipButton>
          </ButtonsGroup>
        </PageHeaderRow>
        <MyProfileTabs />
      </PageHeaderWrapper>
    }
    main={<Memberships />}
  />
)
