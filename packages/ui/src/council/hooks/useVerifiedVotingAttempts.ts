import { useEffect, useMemo } from 'react'

import { useGetCouncilVotesCommitmentsLazyQuery } from '@/council/queries'

import { useMyVotingAttempts } from './useMyVotingAttempts'

export const useVerifiedVotingAttempts = (cycleId?: number, optionId?: string) => {
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
      const castedCommitment = data.castVotes.map(({ commitment }) => commitment)
      return myAttempts.filter(({ commitment }) => castedCommitment.includes(commitment))
    }
  }, [myAttempts?.length, data?.castVotes.length])
}
