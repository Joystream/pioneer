import React from 'react'
import styled from 'styled-components'

import { ConstitutionIcon } from '@/common/components/page/Sidebar/LinksIcons/ConstitutionIcon'
import { CouncilIcon } from '@/common/components/page/Sidebar/LinksIcons/CouncilIcon'
import { ForumIcon } from '@/common/components/page/Sidebar/LinksIcons/ForumIcon'
import { OverviewIcon } from '@/common/components/page/Sidebar/LinksIcons/OverviewIcon'
import { SettingsIcon } from '@/common/components/page/Sidebar/LinksIcons/SettingsIcon'
import { ValidatorsIcon } from '@/common/components/page/Sidebar/LinksIcons/ValidatorsIcon'
import { ProposalsRoutes } from '@/proposals/constants/routes'

import { MembersIcon } from '../../common/components/page/Sidebar/LinksIcons/MembersIcon'
import { MyProfileIcon } from '../../common/components/page/Sidebar/LinksIcons/MyProfileIcon'
import { ProposalsIcon } from '../../common/components/page/Sidebar/LinksIcons/ProposalsIcon'
import { WorkingGroupsIcon } from '../../common/components/page/Sidebar/LinksIcons/WorkingGroupsIcon'
import { LogoLink } from '../../common/components/page/Sidebar/LogoLink'
import { Navigation } from '../../common/components/page/Sidebar/Navigation'
import { NavigationHeader } from '../../common/components/page/Sidebar/NavigationHeader'
import { NavigationLink } from '../../common/components/page/Sidebar/NavigationLink'
import { Version } from '../../common/components/page/Sidebar/Version'
import { ProfileComponent } from '../../memberships/components/ProfileComponent'

export const SideBar = () => (
  <Navigation>
    <NavigationHeader>
      <LogoLink />
    </NavigationHeader>
    <NavigationLinks>
      <NavigationLinksItem>
        <NavigationLink to="lorem" disabled>
          <OverviewIcon />
          Overview
        </NavigationLink>
      </NavigationLinksItem>
      <NavigationLinksItem>
        <NavigationLink to="/profile">
          <MyProfileIcon />
          My profile
        </NavigationLink>
      </NavigationLinksItem>
      <NavigationLinksItem>
        <NavigationLink to="/working-groups">
          <WorkingGroupsIcon />
          Working Groups
        </NavigationLink>
      </NavigationLinksItem>
      <NavigationLinksItem>
        <NavigationLink to={ProposalsRoutes.current}>
          <ProposalsIcon />
          Proposals
        </NavigationLink>
      </NavigationLinksItem>
      <NavigationLinksItem>
        <NavigationLink to="lorem" disabled>
          <CouncilIcon />
          Council
        </NavigationLink>
      </NavigationLinksItem>
      <NavigationLinksItem>
        <NavigationLink to="lorem" disabled>
          <ConstitutionIcon />
          Constitution
        </NavigationLink>
      </NavigationLinksItem>
      <NavigationLinksItem>
        <NavigationLink to="lorem" disabled>
          <ValidatorsIcon />
          Validators
        </NavigationLink>
      </NavigationLinksItem>
      <NavigationLinksItem>
        <NavigationLink to="lorem" disabled>
          <ForumIcon />
          Forum
        </NavigationLink>
      </NavigationLinksItem>
      <NavigationLinksItem>
        <NavigationLink to="/members">
          <MembersIcon />
          Members
        </NavigationLink>
      </NavigationLinksItem>
      <NavigationLinksItem>
        <NavigationLink to="lorem" disabled>
          <SettingsIcon />
          Settings
        </NavigationLink>
      </NavigationLinksItem>
    </NavigationLinks>
    <ProfileComponent />
    <Version />
  </Navigation>
)

const NavigationLinks = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-area: barlinks;
  margin: 0;
  padding: 0;
  list-style: none;
`

const NavigationLinksItem = styled.li`
  display: flex;
  flex-direction: column;
  flex-basis: 48px;
  flex-shrink: 0;
  width: 100%;
`
