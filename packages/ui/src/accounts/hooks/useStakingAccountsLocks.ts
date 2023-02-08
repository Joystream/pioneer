import BN from 'bn.js'
import { useEffect, useState } from 'react'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { areLocksConflicting, isRecoverable, RecoveryConditions } from '../model/lockTypes'
import { AccountOption, LockType, OptionLock } from '../types'

import { useMyAccounts } from './useMyAccounts'
import { useMyBalances } from './useMyBalances'
import { useVotingOptOutAccounts } from './useVotingOptOutAccounts'

type StakingAccount = AccountOption & { optionLocks: OptionLock[] }
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
}: UseStakingAccountsLocks): StakingAccount[] => {
  const { allAccounts } = useMyAccounts()
  const balances = useMyBalances()
  const {
    active: activeMember,
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const [accountsWithLocks, setAccountWithLocks] = useState<StakingAccount[]>(
    allAccounts.map((account) => {
      const optionLocks: OptionLock[] = []
      const accountAddress = account.address
      const accountBalances = balances?.[accountAddress]

      const boundMembershipId = getMemberIdByBoundAccountAddress(accountAddress)
      if (accountBalances && accountBalances.total?.lt(requiredStake) && filterByBalance) {
        optionLocks.push('insufficientFunds')
      }

      if (boundMembershipId && boundMembershipId !== activeMember?.id && lockType !== 'Voting') {
        optionLocks.push('boundMembership')
      }

      if (accountBalances && areLocksConflicting(lockType, accountBalances.locks)) {
        if (isRecoverable(lockType, recoveryConditions)) {
          optionLocks.push('recoverableLock')
        } else {
          optionLocks.push('rivalrousLock')
        }
      }

      return { ...account, optionLocks }
    })
  )

  const isVoting = lockType === 'Voting'
  const votingOptOutAccounts = useVotingOptOutAccounts({ skip: !isVoting })
  useEffect(() => {
    if (!isVoting) return

    setAccountWithLocks(
      accountsWithLocks.map(({ address, optionLocks, ...account }): StakingAccount => {
        const isOptOut = votingOptOutAccounts.includes(address)
        return { address, ...account, optionLocks: isOptOut ? [...optionLocks, 'optOutLock'] : optionLocks }
      })
    )
  }, [votingOptOutAccounts])

  return accountsWithLocks
}
