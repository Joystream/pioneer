import React, { useState } from 'react'

import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'
import { RecoverBalanceModal } from '@/accounts/modals/RecoverBalance'
import { PageLayout } from '@/app/components/PageLayout'
import { ButtonPrimary } from '@/common/components/buttons'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { BN_ZERO } from '@/common/constants'

import { Accounts } from './components/Accounts'
import { MyProfileTabs } from './components/MyProfileTabs'

const RecoverBalances = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <ButtonPrimary size="medium" onClick={() => setOpen(true)}>
        Recover all
      </ButtonPrimary>
      {isOpen && <RecoverBalanceModal onClose={() => setOpen(false)} />}
    </>
  )
}

export const MyAccounts = () => {
  const { total, transferable, locked, recoverable } = useMyTotalBalances()

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeader>
            <PageTitle>My Profile</PageTitle>
            <MyProfileTabs />
          </PageHeader>
          <Statistics>
            <TokenValueStat title="Total balance" tooltipText="Lorem ipsum..." value={total} />
            <TokenValueStat title="Total transferable balance" tooltipText="Lorem ipsum..." value={transferable} />
            <TokenValueStat title="Total locked balance" tooltipText="Lorem ipsum..." value={locked} />
            <TokenValueStat title="Total recoverable" tooltipText="Lorem ipsum..." value={recoverable}>
              {recoverable.gt(BN_ZERO) ? <RecoverBalances /> : null}
            </TokenValueStat>
          </Statistics>
        </RowGapBlock>
      }
      main={<Accounts />}
    />
  )
}
