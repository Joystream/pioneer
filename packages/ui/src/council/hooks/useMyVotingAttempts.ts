import { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { isDefined } from '@/common/utils'
import { calculateCommitment } from '@/council/model/calculateCommitment'

import { VotingAttempt } from './useCommitment'

export const useMyVotingAttempts = (cycleId?: number, optionId?: string) => {
  const [votingAttempts = []] = useLocalStorage<VotingAttempt[]>(`votes:${cycleId}`)
  const { allAccounts } = useMyAccounts()

  return useMemo(() => {
    if (!isDefined(cycleId)) return
    if (!allAccounts.length) return []

    const addresses = allAccounts.map((account) => account.address)
    return votingAttempts
      .filter((attempt) => addresses.includes(attempt.accountId) && (!optionId || optionId === attempt.optionId))
      .map(({ salt, accountId, optionId }) => ({
        salt,
        accountId,
        optionId,
        commitment: calculateCommitment(accountId, optionId, salt, cycleId),
      }))
  }, [votingAttempts.length, allAccounts.length, cycleId, optionId])
}
