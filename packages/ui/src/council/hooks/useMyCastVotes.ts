import BN from 'bn.js'
import { useEffect, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { isDefined } from '@/common/utils'
import { VotingAttempt } from '@/council/hooks/useCommitment'
import { useMyVotingAttempts } from '@/council/hooks/useMyVotingAttempts'
import { useGetCouncilVotesLazyQuery } from '@/council/queries'
import { asVote, ElectionCandidate, Vote } from '@/council/types'

export interface MyCastVote extends Vote {
  optionId: string
  attempt?: VotingAttempt
}

export interface CandidateWithMyVotes extends ElectionCandidate {
  ownStake: BN
  myVotes: MyCastVote[]
}

export const useMyCastVotes = (cycleId?: number) => {
  const { allAccounts } = useMyAccounts()
  const [getVotes, { data, loading }] = useGetCouncilVotesLazyQuery()
  const myVotingAttempts = useMyVotingAttempts(cycleId)

  useEffect(() => {
    if (isDefined(cycleId)) {
      getVotes({
        variables: {
          where: {
            castBy_in: allAccounts.map(({ address }) => address),
            electionRound: { cycleId_eq: cycleId },
          },
        },
      })
    }
  }, [cycleId])

  const votes = useMemo(() => {
    if (!data?.castVotes || !myVotingAttempts) return

    return data.castVotes.map(asVote).flatMap<MyCastVote>((vote) => {
      if (vote.voteFor) return { ...vote, optionId: vote.voteFor.id }

      const attempt = myVotingAttempts.find(({ commitment }) => commitment === vote.commitment)

      return attempt ? { ...vote, optionId: attempt.optionId, attempt } : []
    })
  }, [allAccounts?.length, data?.castVotes, myVotingAttempts?.length])

  return { votes, isLoading: loading }
}
