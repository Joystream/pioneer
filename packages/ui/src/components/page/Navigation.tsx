import { SideBar } from './SideBar'
import React from 'react'
import { ProfileComponent } from '../../pages/Profile/ProfileComponent'
import { Version } from './Version'

export function Navigation() {
  return (
    <SideBar>
      Logo
      <ul>
        <li> My profile</li>
      </ul>
      <ProfileComponent />
      <Version />
    </SideBar>
  )
}
