import { NavBar } from './NavBar'
import React from 'react'
import { ProfileComponent } from '../../pages/Profile/ProfileComponent'

export function Navigation() {
  return (
    <NavBar>
      Logo
      <ul>
        <li> My profile</li>
      </ul>
      <ProfileComponent />
    </NavBar>
  )
}
