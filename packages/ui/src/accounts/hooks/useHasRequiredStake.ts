import BN from 'bn.js'

import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { areLocksConflicting } from '@/accounts/model/lockTypes'
import { LockType } from '@/accounts/types'

export const useHasRequiredStake = (stake: number, lock: LockType) => {
  const balances = useMyBalances()

  const compatibleAccounts = Object.entries(balances).filter(
    ([, balances]) => !areLocksConflicting(lock, balances.locks)
  )

  if (compatibleAccounts.length < 1) {
    return {
      hasRequiredStake: false,
      accountsWithLockedFounds: null,
      transferableAccounts: null,
    }
  }

  const hasRequiredStake = !!compatibleAccounts.find(([, balances]) => balances.total.gte(new BN(stake)))

  return {
    hasRequiredStake,
    accountsWithLockedFounds: null,
    transferableAccounts: null,
  }
}
