import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { AppPage } from '../../components/AppPage'

import { Memberships } from './components/Memberships'

export const MyMemberships = () => {
  const history = useHistory()
  const isProfile = !!useRouteMatch({
    exact: true,
    path: '/profile',
  })
  const isMembers = !!useRouteMatch('/profile/memberships')

  const tabs = [
    { title: 'My accounts', active: isProfile, onClick: () => history.push('/profile') },
    { title: 'My memberships', active: isMembers, onClick: () => history.push('/profile/memberships') },
  ]

  const crumbs = [
    { href: '#', text: 'My Profile' },
    { href: '#', text: 'My Memberships' },
  ]

  return (
    <AppPage pageTitle="My Profile" crumbs={crumbs} tabs={tabs}>
      <Memberships />
    </AppPage>
  )
}
