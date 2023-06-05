import React from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { ValidatorsTabs } from './components/ValidatorsTabs'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { MultiValueStat, Statistics, TokenValueStat } from '@/common/components/statistics'
import { BN } from '@polkadot/util'
import { useMyTotalBalances } from '@/accounts/hooks/useMyTotalBalances'
import { ClaimAllButton } from './components/ClaimAllButton'
import { ValidatorDashboardMain } from '@/validators/components/ValidatorDashboardMain'

export const ValidatorDashboard = () => {

  const { vestedClaimable } = useMyTotalBalances();

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24} >
          <PageHeader
            title="Validators"
            tabs={<ValidatorsTabs />}
          />
          <Statistics>
            <TokenValueStat title='CLAIMABLE REWARDS' value={vestedClaimable} actionElement={<ClaimAllButton />} />
            <MultiValueStat
              title="STAKE"
              values={[
                { label: 'Total', value: new BN(0) },
                { label: 'Yours', value: new BN(0) },
              ]}
            />
            <MultiValueStat
              title="YOUR REWARDS "
              values={[
                { label: 'total', value: new BN(0) },
                { label: 'last', value: new BN(0) },
              ]}
            />
            <MultiValueStat
              title="ANNUAL PECENTAGE RATE(APR)"
              values={[
                { label: 'Average', value: new BN(0) },
                { label: 'Last 7 days', value: new BN(0) },
              ]}
            />
          </Statistics>
        </RowGapBlock>
      }
      main={
        <ValidatorDashboardMain />
      }
    />
  )
}
