import React from 'react'

import { Loading } from '@/common/components/Loading'
import { NoData } from '@/common/components/NoData'
import { BN_ZERO } from '@/common/constants'
import { useElectionVotes } from '@/council/hooks/useElectionVotes'
import { Election } from '@/council/types/Election'

import { CandidateVoteList } from './CandidateVoteList'

interface Props {
  election: Election
  onlyMyVotes?: boolean
}

export const ElectionVotes = ({ election, onlyMyVotes }: Props) => {
  const { votesPerCandidate, sumOfStakes: totalStake, isLoading } = useElectionVotes(election)

  const votesToDisplay = onlyMyVotes ? votesPerCandidate.filter((vote) => vote.myVotes.length) : votesPerCandidate

  if (isLoading) {
    return <Loading />
  }

  if (!votesPerCandidate.length) {
    return <NoData>No votes have been cast yet.</NoData>
  }

  if (!votesToDisplay.length) {
    return <NoData>No votes found.</NoData>
  }

  return (
    <CandidateVoteList
      votes={votesToDisplay.map((candidateStats, index) => ({
        candidateId: candidateStats.candidate.id,
        index: index + 1,
        member: candidateStats.candidate.member,
        sumOfAllStakes: candidateStats.totalStake,
        totalStake: totalStake ?? BN_ZERO,
        votes: candidateStats.votesNumber,
        ownStake: candidateStats.ownStake,
        myVotes: candidateStats.myVotes,
      }))}
    />
  )
}
