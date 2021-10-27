import { useEffect, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { calculateCommitment } from '@/council/model/calculateCommitment'
import { useGetCouncilVotesCommitmentsLazyQuery } from '@/council/queries'

import { VotingAttempt } from './useCommitment'

export const useStoredCastedVotes = (cycleId?: number, optionId?: string) => {
  const [get, { data }] = useGetCouncilVotesCommitmentsLazyQuery()

  const [votingAttempts = []] = useLocalStorage<VotingAttempt[]>(`votes:${cycleId}`)
  const { allAccounts } = useMyAccounts()
  const myAttempts = useMemo(() => {
    if (!cycleId) return
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

  useEffect(() => {
    if (!myAttempts?.length) return
    get({
      variables: {
        where: {
          commitment_in: myAttempts.map(({ commitment }) => commitment),
          electionRound: { cycleId_eq: cycleId },
        },
      },
    })
  }, [myAttempts?.length])

  return useMemo(() => {
    if (!myAttempts) {
      return
    } else if (myAttempts.length === 0) {
      return []
    } else if (data) {
      const castedCommitment = data.castVotes.map(({ commitment }) => commitment)
      return myAttempts.filter(({ commitment }) => castedCommitment.includes(commitment))
    }
  }, [myAttempts?.length, data?.castVotes.length])
}
