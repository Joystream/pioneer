import React, { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { MultiTextValueStat, MultiValueStat, Statistics, TokenValueStat } from '@/common/components/statistics'
import { BN_ZERO } from '@/common/constants'
import { NominatorPositionsTable } from '@/validators/components/nominator/NominatorPositionsTable'
import { useMyStakingAPR } from '@/validators/hooks/useMyStakingAPR'
import { useMyStakingInfo } from '@/validators/hooks/useMyStakingInfo'
import { useMyStakingRewards } from '@/validators/hooks/useMyStakingRewards'
import { useMyStashPositions } from '@/validators/hooks/useMyStashPositions'
import { useValidatorsList } from '@/validators/hooks/useValidatorsList'

import { ClaimAllButton } from './components/ClaimAllButton'
import { ValidatorsTabs } from './components/ValidatorsTabs'

export const NominatorDashboard = () => {
  const { validatorsWithDetails } = useValidatorsList()
  const stakingInfo = useMyStakingInfo()
  const stakingRewards = useMyStakingRewards()
  const stakingAPR = useMyStakingAPR()
  const { allAccounts } = useMyAccounts()
  const stashPositions = useMyStashPositions()

  const accountsMap = useMemo(() => new Map(allAccounts.map((account) => [account.address, account])), [allAccounts])

  const validatorsMap = useMemo(
    () => new Map((validatorsWithDetails ?? []).map((validator) => [validator.stashAccount, validator])),
    [validatorsWithDetails]
  )

  const positions = stashPositions ?? []

  const totalStake = stakingInfo?.totalStake ?? BN_ZERO
  const totalClaimable = stakingRewards?.claimableRewards ?? BN_ZERO

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeader title="Validators" tabs={<ValidatorsTabs />} />
          <Statistics>
            <TokenValueStat
              title="CLAIMABLE REWARDS"
              tooltipText="Total staking rewards that can be claimed from all your nominator accounts. These are rewards earned but not yet claimed from past eras."
              tooltipTitle="Claimable Staking Rewards"
              tooltipLinkText="Learn about claiming rewards"
              tooltipLinkURL="#"
              value={stakingRewards?.claimableRewards}
              actionElement={<ClaimAllButton />}
            />
            <MultiValueStat
              title="STAKE"
              tooltipText="Your total nominated stake across all validators you're nominating."
              tooltipTitle="Nominator Stake"
              tooltipLinkText="Learn about nominating"
              tooltipLinkURL="#"
              values={[
                { label: 'Total', value: stakingInfo?.totalStake ?? BN_ZERO },
                { label: 'Yours', value: stakingInfo?.ownStake ?? BN_ZERO },
              ]}
            />
            <MultiValueStat
              title="YOUR REWARDS "
              tooltipText="Total rewards earned from nominating validators and the rewards from the most recent era."
              tooltipTitle="Nominator Rewards"
              tooltipLinkText="Learn about nominator rewards"
              tooltipLinkURL="#"
              values={[
                { label: 'total', value: stakingRewards?.totalRewards ?? BN_ZERO },
                { label: 'last', value: stakingRewards?.lastEraRewards ?? BN_ZERO },
              ]}
            />
            <MultiTextValueStat
              title="ANNUAL PECENTAGE RATE(APR)"
              tooltipText="Expected annual percentage return based on your nominated validators' performance. Average is calculated from the last 30 eras (~7.5 days)."
              tooltipTitle="Nominator APR"
              tooltipLinkText="Learn about APR calculation"
              tooltipLinkURL="#"
              values={[
                { label: 'Average', value: `${stakingAPR?.averageAPR?.toFixed(2) ?? '0.00'}%` },
                { label: 'Last 7 days', value: `${stakingAPR?.last7DaysAPR?.toFixed(2) ?? '0.00'}%` },
              ]}
            />
          </Statistics>
        </RowGapBlock>
      }
      main={
        <NominatorPositionsTable
          positions={positions}
          accountsMap={accountsMap}
          validatorsMap={validatorsMap}
          totalStake={totalStake}
          totalClaimable={totalClaimable}
        />
      }
    />
  )
}
