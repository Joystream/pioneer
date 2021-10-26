import { useEffect, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { isDefined } from '@/common/utils'
import { calculateCommitment } from '@/council/model/calculateCommitment'
import { useGetCouncilVotesCommitmentsLazyQuery } from '@/council/queries'

import { VotingAttempt } from './useCommitment'

export const useStoredCastVotes = (cycleId?: number) => {
  const [get, { data }] = useGetCouncilVotesCommitmentsLazyQuery()

  const [votingAttempts = []] = useLocalStorage<VotingAttempt[]>(`votes:${cycleId}`)
  const { allAccounts } = useMyAccounts()
  const myAttempts = useMemo(() => {
    if (!cycleId || !allAccounts.length) return

    const addresses = allAccounts.map((account) => account.address)
    return votingAttempts
      .filter(({ accountId }) => addresses.includes(accountId))
      .map(({ salt, accountId, optionId }) => ({
        salt,
        accountId,
        optionId,
        commitment: calculateCommitment(accountId, optionId, salt, cycleId),
      }))
  }, [votingAttempts.length, allAccounts.length, cycleId])

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
      const attemptsWithVoteIds = myAttempts.map((attempt) => ({
        ...attempt,
        voteId: data.castVotes.find((vote) => vote.commitment === attempt.commitment)?.id,
      }))
      return attemptsWithVoteIds.filter((attempt) => isDefined(attempt.voteId))
    }
  }, [myAttempts?.length, data?.castVotes.length])
}
