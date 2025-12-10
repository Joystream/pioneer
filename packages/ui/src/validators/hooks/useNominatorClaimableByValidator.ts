import BN from 'bn.js'
import { useMemo } from 'react'

import { BN_ZERO } from '@/common/constants'
import { ValidatorWithDetails } from '@/validators/types/Validator'

import { useMyStakingInfo } from './useMyStakingInfo'
import { useMyStakingRewards } from './useMyStakingRewards'
import { useNominatorValidatorInfo } from './useNominatorValidatorInfo'

/**
 * Hook to estimate claimable rewards for a specific validator
 * This is an approximation based on the user's total claimable rewards
 * proportional to their stake on this validator
 * @param validator The validator to calculate claimable rewards for
 */
export const useNominatorClaimableByValidator = (validator: ValidatorWithDetails): BN => {
  const stakingInfo = useMyStakingInfo()
  const stakingRewards = useMyStakingRewards()
  const nominatorInfo = useNominatorValidatorInfo(validator)

  return useMemo(() => {
    if (!stakingInfo || !stakingRewards || !nominatorInfo) {
      return BN_ZERO
    }

    const { totalStake } = stakingInfo
    const { claimableRewards } = stakingRewards
    const { yourStake } = nominatorInfo

    // If no total stake or no claimable rewards, return zero
    if (totalStake.isZero() || claimableRewards.isZero() || yourStake.isZero()) {
      return BN_ZERO
    }

    // Estimate claimable rewards proportional to stake on this validator
    // claimableForValidator = totalClaimable * (stakeOnValidator / totalStake)
    const estimatedClaimable = claimableRewards.mul(yourStake).div(totalStake)

    return estimatedClaimable
  }, [stakingInfo, stakingRewards, nominatorInfo])
}
