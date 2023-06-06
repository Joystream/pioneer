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
            <TokenValueStat title='CLAIMABLE REWARDS' tooltipText="tooltip text..."
              tooltipTitle="claim rewards tooltip title"
              tooltipLinkText="link..."
              tooltipLinkURL="#" value={vestedClaimable} actionElement={<ClaimAllButton />} />
            <MultiValueStat
              title="STAKE"
              tooltipText="tooltip text..."
              tooltipTitle="stake tooltip title"
              tooltipLinkText="link..."
              tooltipLinkURL="#"
              values={[
                { label: 'Total', value: new BN(0) },
                { label: 'Yours', value: new BN(0) },
              ]}
            />
            <MultiValueStat
              title="YOUR REWARDS "
              tooltipText="tooltip text..."
              tooltipTitle="Rewards tooltip title"
              tooltipLinkText="link..."
              tooltipLinkURL="#"
              values={[
                { label: 'total', value: new BN(0) },
                { label: 'last', value: new BN(0) },
              ]}
            />
            <MultiValueStat
              title="ANNUAL PECENTAGE RATE(APR)"
              tooltipText="tooltip text..."
              tooltipTitle="annual tooltip title"
              tooltipLinkText="link..."
              tooltipLinkURL="#"
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
