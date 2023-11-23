import React from 'react'
import styled from 'styled-components'

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
        <MyMembershipsHeaderWrapper>
          <PageTitle>My Profile</PageTitle>
          <ButtonsGroup>
            <InviteMemberButton size="medium">Invite a member</InviteMemberButton>
            <AddMembershipButton size="medium">
              <PlusIcon />
              Add Membership
            </AddMembershipButton>
          </ButtonsGroup>
        </MyMembershipsHeaderWrapper>
        <MyProfileTabs />
      </PageHeaderWrapper>
    }
    main={<Memberships />}
  />
)

const MyMembershipsHeaderWrapper = styled(PageHeaderRow)`
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${ButtonsGroup} {
      grid-auto-flow: row;
      grid-row-gap: 8px;
      width: 100%;

      button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center:
        gap: 4px;
      }
    }
  }
`
