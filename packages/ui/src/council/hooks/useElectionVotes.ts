import BN from 'bn.js'
import { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { BN_ZERO } from '@/common/constants'
import { Comparator } from '@/common/model/Comparator'
import { sumStakes } from '@/common/utils/bn'

import { useGetCouncilVotesQuery } from '../queries'
import { asVote, ElectionCandidate, Vote } from '../types'
import { Election } from '../types/Election'

import { VotingAttempt } from './useCommitment'
import { useMyVotingAttempts } from './useMyVotingAttempts'

export interface MyCastVote extends Vote {
  optionId: string
  attempt?: VotingAttempt
}

export interface CandidateStats {
  candidate: ElectionCandidate
  votesNumber: number
  totalStake: BN
  ownStake: BN
  myVotes: MyCastVote[]
}

export const useElectionVotes = (election?: Election) => {
  const { allAccounts } = useMyAccounts()
  const { data, loading } = useGetCouncilVotesQuery({
    variables: { where: { electionRound: { cycleId_eq: election?.cycleId } } },
  })
  const votes = useMemo(() => data?.castVotes.map(asVote), [data?.castVotes])

  const myVotingAttempts = useMyVotingAttempts(election?.cycleId)
  const myCastVotes = useMemo(() => {
    if (!votes || !myVotingAttempts) return
    if (!allAccounts.length) return []

    const addresses = allAccounts.map((account) => account.address)
    return votes
      .filter(({ castBy }) => addresses.includes(castBy))
      .flatMap<MyCastVote>((vote) => {
        if (vote.voteFor) return { ...vote, optionId: vote.voteFor.id }

        const attempt = myVotingAttempts.find(({ commitment }) => commitment === vote.commitment)

        return attempt ? { ...vote, optionId: attempt.optionId, attempt } : []
      })
  }, [allAccounts?.length, votes, myVotingAttempts?.length])

  const votesPerCandidate = useMemo(() => {
    const candidateStats: Record<string, CandidateStats> = {}
    election?.candidates.forEach(
      (candidate) =>
        (candidateStats[candidate.member.id] = {
          candidate,
          votesNumber: 0,
          totalStake: BN_ZERO,
          ownStake: BN_ZERO,
          myVotes: myCastVotes?.filter(({ optionId }) => optionId === candidate.member.id) ?? [],
        })
    )
    votes?.forEach((vote) => {
      const candidate = vote.voteFor && candidateStats[vote.voteFor.id]
      if (candidate) {
        candidate.votesNumber += 1
        candidate.totalStake = candidate.totalStake.add(vote.stake)
        if (allAccounts.find((account) => account.address === vote.castBy)) {
          candidate.ownStake = candidate.ownStake.add(vote.stake)
        }
      }
    })

    return Object.values(candidateStats).sort((a, b) => Comparator<CandidateStats>(true, 'totalStake').bigNumber(a, b))
  }, [votes, myCastVotes?.length])

  const sumOfStakes = useMemo(() => votes && sumStakes(votes), [votes])

  return {
    votesPerCandidate,
    sumOfStakes,
    isLoading: loading,
  }
}
