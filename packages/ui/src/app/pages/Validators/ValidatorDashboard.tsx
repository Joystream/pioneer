import React, { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { filterAccounts } from '@/accounts/model/filterAccounts'
import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { MultiTextValueStat, MultiValueStat, Statistics, TokenValueStat } from '@/common/components/statistics'
import { BN_ZERO } from '@/common/constants'
import { ValidatorDashboardMain } from '@/validators/components/ValidatorDashboardMain'
import { useAllAccountsStakingRewards } from '@/validators/hooks/useAllAccountsStakingRewards'
import { useMyStakingAPR } from '@/validators/hooks/useMyStakingAPR'
import { useMyStakingInfo } from '@/validators/hooks/useMyStakingInfo'
import { useMyStakingRewards } from '@/validators/hooks/useMyStakingRewards'
import { useMyStashPositions } from '@/validators/hooks/useMyStashPositions'

import { ClaimAllButton } from './components/ClaimAllButton'
import { ValidatorsTabs } from './components/ValidatorsTabs'

export const ValidatorDashboard = () => {
  const { allAccounts } = useMyAccounts()
  const balances = useMyBalances()
  const stakingInfo = useMyStakingInfo()
  const stakingRewards = useMyStakingRewards()
  const stakingAPR = useMyStakingAPR()
  const stashPositions = useMyStashPositions()

  // Calculate total claimable from individual account rewards (same as Overview)
  const visibleAccounts = useMemo(
    () => filterAccounts(allAccounts, true, balances),
    [JSON.stringify(allAccounts), balances]
  )

  const validatorAccounts = useMemo(() => {
    if (!stashPositions) return []
    const validatorStashes = new Set(stashPositions.filter((pos) => pos.role === 'validator').map((pos) => pos.stash))
    return visibleAccounts.filter((account) => validatorStashes.has(account.address))
  }, [visibleAccounts, stashPositions])

  const stakingRewardsMap = useAllAccountsStakingRewards(validatorAccounts)

  const totalClaimable = useMemo(() => {
    if (!stakingRewardsMap) return BN_ZERO
    let total = BN_ZERO
    stakingRewardsMap.forEach((rewards) => {
      total = total.add(rewards.claimable)
    })
    return total
  }, [stakingRewardsMap])

  return (
    <PageLayout
      fullWidth
      header={
        <RowGapBlock gap={24}>
          <PageHeader title="Validators" tabs={<ValidatorsTabs />} />
          <Statistics>
            <TokenValueStat
              title="CLAIMABLE REWARDS"
              tooltipText="Total staking rewards that can be claimed from all your validator accounts. These are rewards earned but not yet claimed from past eras."
              tooltipTitle="Claimable Staking Rewards"
              tooltipLinkText="Learn about claiming rewards"
              tooltipLinkURL="#"
              value={totalClaimable}
              actionElement={<ClaimAllButton />}
            />
            <MultiValueStat
              title="STAKE"
              tooltipText="Your total staked amount and active stake across all your validator accounts."
              tooltipTitle="Validator Stake"
              tooltipLinkText="Learn about staking"
              tooltipLinkURL="#"
              values={[
                { label: 'Total', value: stakingInfo?.totalStake ?? BN_ZERO },
                { label: 'Yours', value: stakingInfo?.ownStake ?? BN_ZERO },
              ]}
            />
            <MultiValueStat
              title="YOUR REWARDS "
              tooltipText="Total rewards earned from validation and the rewards from the most recent era."
              tooltipTitle="Validator Rewards"
              tooltipLinkText="Learn about validator rewards"
              tooltipLinkURL="#"
              values={[
                { label: 'total', value: stakingRewards?.totalRewards ?? BN_ZERO },
                { label: 'last', value: stakingRewards?.lastEraRewards ?? BN_ZERO },
              ]}
            />
            <MultiTextValueStat
              title="ANNUAL PECENTAGE RATE(APR)"
              tooltipText="Expected annual percentage return based on your validation performance. Average is calculated from the last 30 eras (~7.5 days)."
              tooltipTitle="Validator APR"
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
      main={<ValidatorDashboardMain />}
    />
  )
}
