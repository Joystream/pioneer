import React from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Statistics } from '@/common/components/statistics'
import { Era } from '@/validators/components/statistics/Era'
import { Rewards } from '@/validators/components/statistics/Rewards'
import { Staking } from '@/validators/components/statistics/Staking'
import { ValidatorsState } from '@/validators/components/statistics/ValidatorsState'
import { useStakingStatistics } from '@/validators/hooks/useStakingStatistics'

export const ValidatorList = () => {
  const {
    eraStartedOn,
    eraDuration,
    now,
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

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <Statistics>
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
            <Era eraStartedOn={eraStartedOn} eraDuration={eraDuration} now={now} eraRewardPoints={eraRewardPoints} />
            <Rewards totalRewards={totalRewards} lastRewards={lastRewards} />
          </Statistics>
        </RowGapBlock>
      }
      main={<></>}
    />
  )
}
