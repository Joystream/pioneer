import { Page } from '../../components/page/Page'
import { Navigation } from '../../components/page/Navigation'
import { ProfileComponent } from './ProfileComponent'
import React from 'react'

export function Profile() {
  return (
    <Page>
      <Navigation />
      <ProfileComponent />
    </Page>
  )
}
