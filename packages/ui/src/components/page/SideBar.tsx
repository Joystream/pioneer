import React from 'react'
import styled from 'styled-components'
import { MyProfileIcon } from './Sidebar/LinksIcons/MyProfileIcon'
import { WorkingGroupsIcon } from './Sidebar/LinksIcons/WorkingGroupsIcon'
import { LogoLink } from './Sidebar/LogoLink'
import { Navigation } from './Sidebar/Navigation'
import { NavigationHeader } from './Sidebar/NavigationHeader'
import { NavigationLink } from './Sidebar/NavigationLink'
import { ProfileComponent } from './Sidebar/ProfileComponent'
import { Version } from './Sidebar/Version'

export const SideBar = () => (
  <Navigation>
    <NavigationHeader>
      <LogoLink />
    </NavigationHeader>
    <NavigationLinks>
      <NavigationLinksItem>
        <NavigationLink to="/profile">
          <MyProfileIcon />
          My profile
        </NavigationLink>
      </NavigationLinksItem>
      <NavigationLinksItem>
        <NavigationLink to="/groups">
          <WorkingGroupsIcon />
          Working Groups
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
