import React from 'react'
import styled from 'styled-components'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Statistics } from '@/common/components/statistics'
import { BN_ZERO } from '@/common/constants'
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
  const { validatorsWithDetails, validatorsQueries, allValidatorsCount, format } = useValidatorsList()

  const {
    eraIndex,
    eraStartedOn,
    totalRewards,
    lastRewards,
    idealStaking,
    eraStake,
    stakingPercentage,
    activeValidatorsCount,
    activeNominatorsCount,
    allNominatorsCount,
  } = useStakingStatistics(validatorsQueries)

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeader title="Validators" tabs={<ValidatorsTabs />} />

          <StatisticsStyle>
            <ValidatorsState
              activeValidatorsCount={activeValidatorsCount}
              allValidatorsCount={allValidatorsCount ?? 0}
              activeNominatorsCount={activeNominatorsCount ?? 0}
              allNominatorsCount={allNominatorsCount ?? 0}
            />
            <Staking
              idealStaking={idealStaking ?? BN_ZERO}
              currentStaking={eraStake ?? BN_ZERO}
              stakingPercentage={stakingPercentage}
            />
            <Era eraStartedOn={eraStartedOn} />
            <Rewards totalRewards={totalRewards} lastRewards={lastRewards} />
          </StatisticsStyle>
          <ValidatorsFilter filter={format.filter} />
        </RowGapBlock>
      }
      main={
        <ValidatorsList
          validators={validatorsWithDetails}
          eraIndex={eraIndex}
          order={format.order}
          pagination={format.pagination}
        />
      }
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
