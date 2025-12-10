import BN from 'bn.js'
import { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { BN_ZERO } from '@/common/constants'
import { ValidatorWithDetails } from '@/validators/types/Validator'

export interface NominatorValidatorInfo {
  yourStake: BN
  last7DaysAPR: number
}

/**
 * Hook to get nominator-specific information for a particular validator
 * Uses the validator's staking info to find user's stake
 * @param validator The validator with details
 */
export const useNominatorValidatorInfo = (validator: ValidatorWithDetails): NominatorValidatorInfo => {
  const { allAccounts } = useMyAccounts()

  return useMemo(() => {
    const addresses = allAccounts.map((account) => account.address)

    // Find user's stake from validator's nominators
    let yourStake = BN_ZERO
    if (validator.staking?.nominators) {
      validator.staking.nominators.forEach((nominator) => {
        if (addresses.includes(nominator.address)) {
          yourStake = yourStake.add(nominator.staking)
        }
      })
    }

    // Calculate 7-day APR (approximate based on validator's overall APR)
    // In reality, nominator APR would be slightly less due to validator commission
    const validatorAPR = validator.APR ?? 0
    const commission = validator.commission ?? 0
    const last7DaysAPR = validatorAPR * (1 - commission / 100)

    return {
      yourStake,
      last7DaysAPR,
    }
  }, [validator, JSON.stringify(allAccounts.map((a) => a.address))])
}
