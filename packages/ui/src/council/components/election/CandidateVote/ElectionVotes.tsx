import BN from 'bn.js'
import React, { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Loading } from '@/common/components/Loading'
import { NoData } from '@/common/components/NoData'
import { BN_ZERO } from '@/common/constants'
import { useElectionVotes } from '@/council/hooks/useElectionVotes'
import { Election, ElectionCandidate } from '@/council/types/Election'

import { CandidateVoteList } from './CandidateVoteList'

interface Props {
  election: Election
}

interface CandidateStats {
  candidate: ElectionCandidate
  votesNumber: number
  totalStake: BN
}

export const ElectionVotes = ({ election }: Props) => {
  const { votes, isLoading } = useElectionVotes(election.cycleId)
  const { allAccounts } = useMyAccounts()
  const votesPerCandidate = useMemo(() => {
    const candidateStats: Record<string, CandidateStats> = {}
    election.candidates.forEach(
      (candidate) => (candidateStats[candidate.member.id] = { candidate, votesNumber: 0, totalStake: BN_ZERO })
    )
    votes?.forEach((vote) => {
      const candidate = vote.voteFor && candidateStats[vote.voteFor.id]
      if (candidate) {
        candidate.votesNumber += 1
        candidate.totalStake = candidate.totalStake.add(vote.stake)
      }
    })
    return Object.values(candidateStats).sort((a, b) => b.totalStake.sub(a.totalStake).toNumber())
  }, [votes])

  const sumOfStakes = useMemo(() => votes?.reduce((acc, vote) => acc.add(vote.stake), BN_ZERO), [votes])

  if (isLoading) {
    return <Loading />
  }

  if (!votes) {
    return <NoData>No votes have been cast yet.</NoData>
  }

  return (
    <CandidateVoteList
      votes={votesPerCandidate.map((candidateStats, index) => ({
        index: index + 1,
        voteOwner: false,
        revealed: true,
        member: candidateStats.candidate.member,
        sumOfAllStakes: sumOfStakes ?? BN_ZERO,
        totalStake: candidateStats.totalStake,
        votes: candidateStats.votesNumber,
      }))}
    />
  )
}
