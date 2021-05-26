import React from 'react'

import { useTotalBalances } from '../../../accounts/hooks/useTotalBalances'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { Statistics, TokenValueStat } from '../../../common/components/statistics'
import { AppPage } from '../../components/AppPage'

import { Accounts } from './components/Accounts'
import { MyProfileTabs } from './components/MyProfileTabs'

export function MyAccounts() {
  const { total, transferable, locked, recoverable } = useTotalBalances()

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>My Profile</PageTitle>
        <MyProfileTabs />
      </PageHeader>
      <Statistics>
        <TokenValueStat title="Total balance" tooltipText="Lorem ipsum..." value={total} />
        <TokenValueStat title="Total transferable balance" tooltipText="Lorem ipsum..." value={transferable} />
        <TokenValueStat title="Total locked balance" tooltipText="Lorem ipsum..." value={locked} />
        <TokenValueStat title="Total recoverable" tooltipText="Lorem ipsum..." value={recoverable} />
      </Statistics>
      <Accounts />
    </AppPage>
  )
}
