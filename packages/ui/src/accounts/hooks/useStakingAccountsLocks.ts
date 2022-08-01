import BN from 'bn.js'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { RecoveryConditions, isRecoverable, areLocksConflicting } from '../model/lockTypes'
import { LockType, OptionLock, AccountOption } from '../types'

import { useMyAccounts } from './useMyAccounts'
import { useMyBalances } from './useMyBalances'

interface UseStakingAccountsLocks {
  requiredStake: BN
  lockType: LockType
  recoveryConditions?: RecoveryConditions
  filterByBalance: boolean
}

export const useStakingAccountsLocks = ({
  requiredStake,
  lockType,
  recoveryConditions,
  filterByBalance,
}: UseStakingAccountsLocks) => {
  const { allAccounts } = useMyAccounts()
  const balances = useMyBalances()
  const {
    active: activeMember,
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const accountsWithLocks = allAccounts.map((account) => {
    const optionLocks: OptionLock[] = []
    const accountAddress = account.address
    const accountBalances = balances[accountAddress]

    const boundMembershipId = getMemberIdByBoundAccountAddress(accountAddress)
    if (accountBalances.total?.lt(requiredStake) && filterByBalance) {
      optionLocks.push('insufficientFunds')
    }

    if (boundMembershipId && boundMembershipId !== activeMember?.id) {
      optionLocks.push('boundMembership')
    }

    if (areLocksConflicting(lockType, accountBalances.locks)) {
      if (isRecoverable(lockType, recoveryConditions)) {
        optionLocks.push('recoverableLock')
      } else {
        optionLocks.push('rivalrousLock')
      }
    }

    return { ...account, optionLocks }
  })

  return accountsWithLocks as AccountOption[]
}
