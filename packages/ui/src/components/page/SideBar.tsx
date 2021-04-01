import React from 'react'
import styled from 'styled-components'
import { Colors, Transitions } from '../../constants'
import { MyProfileIcon } from './Sidebar/LinksIcons/MyProfileIcon'
import { WorkingGroupsIcon } from './Sidebar/LinksIcons/WorkingGroupsIcon'
import { LogoLink } from './Sidebar/LogoLink'
import { Navigation } from './Sidebar/Navigation'
import { NavigationHeader } from './Sidebar/NavigationHeader'
import { ProfileComponent } from './Sidebar/ProfileComponent'
import { Version } from './Sidebar/Version'

export const SideBar = () => (
  <Navigation>
    <NavigationHeader>
      <LogoLink />
    </NavigationHeader>
    <NavigationLinks>
      <NavigationLinksItem>
        <NavigationLink href="#" className={'active'}>
          <MyProfileIcon />
          My profile
        </NavigationLink>
        <NavigationLink href="#/groups" className={'active'}>
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

const NavigationLink = styled.a`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 12px 12px 12px 24px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  color: ${Colors.Black[200]};
  text-transform: capitalize;
  text-decoration: none;
  transition: ${Transitions.all};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: transparent;
    transition: ${Transitions.all};
  }

  .nav-icon {
    margin-right: 12px;
    color: ${Colors.Black[300]};
    transition: ${Transitions.all};
  }

  &.active {
    color: ${Colors.White};
    background-color: ${Colors.Black[700]};

    &:before {
      background-color: ${Colors.Blue[500]};
    }
  }
  &.active .nav-icon {
    color: ${Colors.White};
  }
`
