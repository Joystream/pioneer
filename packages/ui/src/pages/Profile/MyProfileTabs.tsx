import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { PageTab, PageTabsNav, PageTabs } from '../../components/page/PageTabs'

export function MyProfileTabs() {
  const history = useHistory()
  const isProfile = !!useRouteMatch({
    exact: true,
    path: '/profile',
  })
  const isMembers = !!useRouteMatch('/profile/memberships')

  return (
    <PageTabs>
      <PageTabsNav>
        <PageTab active={isProfile} onClick={() => history.push('/profile')}>
          My accounts
        </PageTab>
        {IS_DEVELOPMENT && (
          <PageTab active={isMembers} onClick={() => history.push('/profile/memberships')}>
            My memberships
          </PageTab>
        )}
      </PageTabsNav>
    </PageTabs>
  )
}
