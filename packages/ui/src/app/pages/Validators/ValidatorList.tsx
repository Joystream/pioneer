import React from 'react'
import styled from 'styled-components'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Statistics } from '@/common/components/statistics'
import { Era } from '@/validators/components/statistics/Era'
import { Rewards } from '@/validators/components/statistics/Rewards'
import { Staking } from '@/validators/components/statistics/Staking'
import { ValidatorsState } from '@/validators/components/statistics/ValidatorsState'
import { ValidatorsFilter } from '@/validators/components/ValidatorsFilter'
import { ValidatorsList } from '@/validators/components/ValidatorsList'
import { useStakingStatistics } from '@/validators/hooks/useStakingStatistics'
import { useValidatorsList } from '@/validators/hooks/useValidatorsList'

import { ValidatorsTabs } from './components/ValidatorsTabs'
export const ValidatorList = () => {
  const {
    eraStartedOn,
    eraRewardPoints,
    totalRewards,
    lastRewards,
    idealStaking,
    currentStaking,
    stakingPercentage,
    activeValidatorsCount,
    allValidatorsCount,
    acitveNominatorsCount,
    allNominatorsCount,
  } = useStakingStatistics()
  const { validatorsWithDetails, pagination, order, filter } = useValidatorsList()

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeader title="Validators" tabs={<ValidatorsTabs />} />

          <StatisticsStyle>
            <ValidatorsState
              activeValidatorsCount={activeValidatorsCount}
              allValidatorsCount={allValidatorsCount}
              acitveNominatorsCount={acitveNominatorsCount}
              allNominatorsCount={allNominatorsCount}
            />
            <Staking
              idealStaking={idealStaking}
              currentStaking={currentStaking}
              stakingPercentage={stakingPercentage}
            />
            <Era eraStartedOn={eraStartedOn} eraRewardPoints={eraRewardPoints} />
            <Rewards totalRewards={totalRewards} lastRewards={lastRewards} />
          </StatisticsStyle>
          <ValidatorsFilter filter={filter} />
        </RowGapBlock>
      }
      main={<ValidatorsList validators={validatorsWithDetails} order={order} pagination={pagination} />}
    />
  )
}

const StatisticsStyle = styled(Statistics)`
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }
`
