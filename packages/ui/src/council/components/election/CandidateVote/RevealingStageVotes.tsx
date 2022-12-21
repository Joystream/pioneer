import BN from 'bn.js'
import React from 'react'

import { Loading } from '@/common/components/Loading'
import { NoData } from '@/common/components/NoData'
import { BN_ZERO } from '@/common/constants'
import { CandidateWithMyVotes } from '@/council/hooks/useMyCastVotes'

import { CandidateVoteList } from './CandidateVoteList'

interface Props {
  onlyMyVotes?: boolean
  candidateWithVotes: CandidateWithMyVotes[]
  totalStake?: BN
  isLoading: boolean
}

export const RevealingStageVotes = ({ candidateWithVotes, totalStake, onlyMyVotes, isLoading }: Props) => {
  const votesToDisplay = onlyMyVotes ? candidateWithVotes.filter((vote) => vote.myVotes.length) : candidateWithVotes

  if (isLoading) {
    return <Loading />
  }

  if (!candidateWithVotes.length) {
    return <NoData>No votes have been cast yet.</NoData>
  }

  if (!votesToDisplay.length) {
    return <NoData>No votes found.</NoData>
  }

  return (
    <CandidateVoteList
      votes={votesToDisplay.map((candidate, index) => ({
        candidateId: candidate.id,
        index: index + 1,
        member: candidate.member,
        sumOfAllStakes: candidate.totalStake,
        totalStake: totalStake ?? BN_ZERO,
        votes: candidate.votesNumber,
        myStake: candidate.myStake,
        myVotes: candidate.myVotes,
      }))}
    />
  )
}
