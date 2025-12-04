import { useMemo } from 'react'

import { ValidatorWithDetails } from '@/validators/types/Validator'

/**
 * Hook to calculate validator health percentage
 * Health is based on:
 * - Being active (50%)
 * - Having rewards (25%)
 * - Low commission (15%)
 * - Not being slashed recently (10%)
 */
export const useValidatorHealth = (validator: ValidatorWithDetails): number => {
  return useMemo(() => {
    let health = 0

    // Active status (50 points)
    if (validator.isActive) {
      health += 50
    }

    // Has rewards/points history (25 points)
    if (validator.rewardPointsHistory && validator.rewardPointsHistory.length > 0) {
      health += 25
    }

    // Low commission (15 points) - full points if commission < 5%, scaled down to 0 if > 20%
    const commission = validator.commission ?? 100
    if (commission < 5) {
      health += 15
    } else if (commission < 20) {
      health += Math.round(15 * (1 - (commission - 5) / 15))
    }

    // Not slashed or low slash count (10 points)
    const slashed = validator.slashed ?? 0
    if (slashed === 0) {
      health += 10
    } else if (slashed < 3) {
      health += Math.round(10 * (1 - slashed / 3))
    }

    return Math.min(100, Math.max(0, health))
  }, [validator])
}
