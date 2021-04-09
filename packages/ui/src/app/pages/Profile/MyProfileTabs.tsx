import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { PageTabs } from '../../../common/components/page/PageTabs'

export function MyProfileTabs() {
  const history = useHistory()
  const isProfile = !!useRouteMatch({
    exact: true,
    path: '/profile',
  })
  const isMembers = !!useRouteMatch('/profile/memberships')

  return (
    <PageTabs
      tabs={[
        { title: 'My accounts', active: isProfile, onClick: () => history.push('/profile') },
        { title: 'My memberships', active: isMembers, onClick: () => history.push('/profile/memberships') },
      ]}
    />
  )
}
