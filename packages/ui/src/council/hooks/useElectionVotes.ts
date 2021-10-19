import BN from 'bn.js'
import { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { BN_ZERO } from '@/common/constants'

import { useGetElectionVotesQuery } from '../queries'
import { asVote, ElectionCandidate } from '../types'
import { Election } from '../types/Election'

interface CandidateStats {
  candidate: ElectionCandidate
  votesNumber: number
  totalStake: BN
  ownStake: BN
}

export const useElectionVotes = (election: Election) => {
  const { allAccounts } = useMyAccounts()
  const { data, loading } = useGetElectionVotesQuery({ variables: { electionCycleId: election.cycleId } })

  const votes = useMemo(() => data?.castVotes.map(asVote), [data?.castVotes.length])

  const votesPerCandidate = useMemo(() => {
    const candidateStats: Record<string, CandidateStats> = {}
    election.candidates.forEach(
      (candidate) =>
        (candidateStats[candidate.member.id] = { candidate, votesNumber: 0, totalStake: BN_ZERO, ownStake: BN_ZERO })
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
    return Object.values(candidateStats).sort((a, b) => b.totalStake.sub(a.totalStake).toNumber())
  }, [votes?.length])

  const sumOfStakes = useMemo(() => votes?.reduce((acc, vote) => acc.add(vote.stake), BN_ZERO), [votes])

  return {
    votesPerCandidate,
    sumOfStakes,
    isLoading: loading,
  }
}
