import { Navigation } from './Sidebar/Navigation'
import React from 'react'
import { ProfileComponent } from '../../pages/Profile/ProfileComponent'
import { Version } from './Version'
import { Logo } from './Sidebar/Logo'

export function SideBar() {
  return (
    <Navigation>
      <Logo />
      <ul>
        <li> My profile</li>
      </ul>
      <ProfileComponent />
      <Version />
    </Navigation>
  )
}
