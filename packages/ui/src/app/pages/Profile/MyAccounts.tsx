import React from 'react'

import { Accounts } from '@/accounts/components/Accounts'
import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'
import { PageLayout, PageHeaderWrapper } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Statistics, TokenValueStat } from '@/common/components/statistics'

import { MyProfileTabs } from './components/MyProfileTabs'

export const MyAccounts = () => {
  const { total, transferable, locked, recoverable } = useMyTotalBalances()

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeaderWrapper>
            <PageTitle>My Profile</PageTitle>
            <MyProfileTabs />
          </PageHeaderWrapper>
          <Statistics>
            <TokenValueStat title="Total balance" tooltipText="Lorem ipsum..." value={total} />
            <TokenValueStat title="Total transferable balance" tooltipText="Lorem ipsum..." value={transferable} />
            <TokenValueStat title="Total locked balance" tooltipText="Lorem ipsum..." value={locked} />
            <TokenValueStat title="Total recoverable" tooltipText="Lorem ipsum..." value={recoverable} />
          </Statistics>
        </RowGapBlock>
      }
      main={<Accounts />}
    />
  )
}
