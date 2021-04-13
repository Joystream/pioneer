import React from 'react'

import { useTotalBalances } from '../../../accounts/hooks/useTotalBalances'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { Statistics } from '../../../common/components/statistics'
import { AppPage } from '../../components/AppPage'

import { Accounts } from './components/Accounts'
import { MyProfileTabs } from './components/MyProfileTabs'

export function MyAccounts() {
  const { total, transferable, locked, recoverable } = useTotalBalances()

  const crumbs = [
    { href: '#', text: 'My Profile' },
    { href: '#', text: 'My Accounts' },
  ]

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>My Profile</PageTitle>
        <MyProfileTabs />
      </PageHeader>
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
