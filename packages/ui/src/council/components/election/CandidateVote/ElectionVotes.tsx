import React from 'react'

import { Loading } from '@/common/components/Loading'
import { NoData } from '@/common/components/NoData'
import { BN_ZERO } from '@/common/constants'
import { useElectionVotes } from '@/council/hooks/useElectionVotes'
import { Election } from '@/council/types/Election'

import { CandidateVoteList } from './CandidateVoteList'

interface Props {
  election: Election
}

export const ElectionVotes = ({ election }: Props) => {
  const { votesPerCandidate, sumOfStakes, isLoading } = useElectionVotes(election)

  if (isLoading) {
    return <Loading />
  }

  if (!votesPerCandidate) {
    return <NoData>No votes have been cast yet.</NoData>
  }

  return (
    <CandidateVoteList
      votes={votesPerCandidate.map((candidateStats, index) => ({
        candidateId: candidateStats.candidate.id,
        revealed: true,
        index: index + 1,
        member: candidateStats.candidate.member,
        sumOfAllStakes: sumOfStakes ?? BN_ZERO,
        totalStake: candidateStats.totalStake,
        votes: candidateStats.votesNumber,
        ownStake: candidateStats.ownStake,
      }))}
    />
  )
}
