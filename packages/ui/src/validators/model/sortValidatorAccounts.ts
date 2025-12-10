import { Account } from '@/accounts/types'
import { BN_ZERO } from '@/common/constants'

import { AccountStakingRewards } from '../hooks/useAllAccountsStakingRewards'

export type ValidatorSortKey = 'name' | 'totalEarned' | 'claimable'

export function sortValidatorAccounts(
  accounts: Account[],
  key: ValidatorSortKey,
  isDescending = false,
  stakingRewardsMap?: Map<string, AccountStakingRewards>
): Account[] {
  const sorted = [...accounts]

  if (key === 'name') {
    sorted.sort((a, b) => {
      const nameA = a.name?.toLowerCase() || a.address.toLowerCase()
      const nameB = b.name?.toLowerCase() || b.address.toLowerCase()
      return isDescending ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB)
    })
  } else if (key === 'totalEarned' && stakingRewardsMap) {
    sorted.sort((a, b) => {
      const rewardsA = stakingRewardsMap.get(a.address)?.totalEarned || BN_ZERO
      const rewardsB = stakingRewardsMap.get(b.address)?.totalEarned || BN_ZERO
      const comparison = rewardsA.cmp(rewardsB)
      return isDescending ? -comparison : comparison
    })
  } else if (key === 'claimable' && stakingRewardsMap) {
    sorted.sort((a, b) => {
      const claimableA = stakingRewardsMap.get(a.address)?.claimable || BN_ZERO
      const claimableB = stakingRewardsMap.get(b.address)?.claimable || BN_ZERO
      const comparison = claimableA.cmp(claimableB)
      return isDescending ? -comparison : comparison
    })
  }

  return sorted
}

export function setValidatorOrder(
  key: ValidatorSortKey,
  sortBy: ValidatorSortKey,
  setSortBy: (k: ValidatorSortKey) => void,
  reversed: boolean,
  setDescending: (d: boolean) => void
) {
  if (key === sortBy) {
    setDescending(!reversed)
  } else {
    setDescending(key !== 'name')
    setSortBy(key)
  }
}
