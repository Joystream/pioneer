import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { useTotalBalances } from '../../../accounts/hooks/useTotalBalances'
import { Statistics } from '../../../common/components/statistics/Stats'
import { AppPage } from '../../components/AppPage'

import { Accounts } from './components/Accounts'

export function MyAccounts() {
  const { total, transferable, locked, recoverable } = useTotalBalances()
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
    { href: '#', text: 'My Accounts' },
  ]

  return (
    <AppPage pageTitle="My profile" crumbs={crumbs} tabs={tabs}>
      <Statistics
        stats={[
          { title: 'Total balance', helperText: 'Lorem fishy', value: total },
          { title: 'Total transferable balance', helperText: 'Lorem fishy', value: transferable },
          { title: 'Total locked balance', helperText: 'Lorem fishy', value: locked },
          { title: 'Total recoverable', helperText: 'Lorem fishy', value: recoverable },
        ]}
      />
      <Accounts />
    </AppPage>
  )
}
