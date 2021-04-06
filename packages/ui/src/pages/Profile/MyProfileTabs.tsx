import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Tabs } from '../../components/page/PageTabs'

export function MyProfileTabs() {
  const history = useHistory()
  const isProfile = !!useRouteMatch({
    exact: true,
    path: '/profile',
  })
  const isMembers = !!useRouteMatch('/profile/memberships')

  return (
    <Tabs
      tabs={[
        { inner: 'My accounts', active: isProfile, onClick: () => history.push('/profile') },
        { inner: 'My memberships', active: isMembers, onClick: () => history.push('/profile/memberships') },
      ]}
    />
  )
}
