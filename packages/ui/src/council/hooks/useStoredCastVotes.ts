import { useEffect, useMemo } from 'react'

import { isDefined } from '@/common/utils'
import { useGetCouncilVotesCommitmentsLazyQuery } from '@/council/queries'

import { useMyVotingAttempts } from './useMyVotingAttempts'

export const useStoredCastVotes = (cycleId?: number, optionId?: string) => {
  const [get, { data }] = useGetCouncilVotesCommitmentsLazyQuery()
  const myAttempts = useMyVotingAttempts(cycleId, optionId)

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
