import { useMemo } from 'react'

import { ERAS_PER_DAY, ERAS_PER_YEAR } from '@/common/constants'

import { useMyStakingInfo } from './useMyStakingInfo'
import { useMyStakingRewards } from './useMyStakingRewards'

export interface MyStakingAPR {
  averageAPR: number
  last7DaysAPR: number
}

/**
 * Hook to calculate user's staking APR
 * Formula: (Average Era Reward * Eras Per Year * 100) / Total Stake
 */
export const useMyStakingAPR = (): MyStakingAPR | undefined => {
  const stakingInfo = useMyStakingInfo()
  const rewards = useMyStakingRewards()

  return useMemo(() => {
    if (!stakingInfo || !rewards || stakingInfo.totalStake.isZero()) {
      return undefined
    }

    const { totalStake } = stakingInfo
    const { monthlyRewards, lastEraRewards } = rewards

    // Calculate average APR based on monthly rewards
    // Monthly rewards are from last 30 eras (ERA_PER_MONTH)
    const ERA_PER_MONTH = ERAS_PER_DAY * 30
    const averageEraReward = monthlyRewards.divn(ERA_PER_MONTH)
    const averageAPR = averageEraReward.isZero()
      ? 0
      : Number(averageEraReward.muln(ERAS_PER_YEAR).muln(10000).div(totalStake)) / 100

    // Calculate last 7 days APR
    // Assuming last era reward represents recent performance
    const last7DaysAPR = lastEraRewards.isZero()
      ? 0
      : Number(lastEraRewards.muln(ERAS_PER_YEAR).muln(10000).div(totalStake)) / 100

    return {
      averageAPR,
      last7DaysAPR,
    }
  }, [stakingInfo, rewards])
}
