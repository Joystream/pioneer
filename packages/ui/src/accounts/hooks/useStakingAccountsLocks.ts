import BN from 'bn.js'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { RecoveryConditions, isRecoverable, areLocksConflicting } from '../model/lockTypes'
import { LockType, OptionLock, AccountOption } from '../types'

import { useMyAccounts } from './useMyAccounts'
import { useMyBalances } from './useMyBalances'

export const useStakingAccountsLocks = (
  requiredStake: BN,
  lockType: LockType,
  recoveryConditions?: RecoveryConditions
) => {
  const { allAccounts } = useMyAccounts()
  const balances = useMyBalances()
  const {
    active: activeMember,
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const accountsWithLocks = allAccounts.map((account) => {
    const optionLocks: OptionLock[] = []
    const accountAddress = account.address
    const balance = balances[accountAddress]

    const boundMembershipId = getMemberIdByBoundAccountAddress(accountAddress)

    if (!balance.transferable.gte(requiredStake)) {
      optionLocks.push('insufficientFunds')
    }

    if (boundMembershipId && boundMembershipId !== activeMember?.id) {
      optionLocks.push('boundMembership')
    }

    if (isRecoverable(lockType, recoveryConditions)) {
      optionLocks.push('recoverableLock')
    }

    if (areLocksConflicting(lockType, balance.locks)) {
      optionLocks.push('rivalrousLock')
    }

    return { ...account, optionLocks }
  })

  return accountsWithLocks as AccountOption[]
}
