import BN from 'bn.js'
import React from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Loading } from '@/common/components/Loading'
import { NoData } from '@/common/components/NoData'
import { useElectionVotes } from '@/council/hooks/useElectionVotes'

import { CandidateVoteList } from './CandidateVoteList'

interface Props {
  electionCycleId: number
}

export const ElectionVotes = ({ electionCycleId }: Props) => {
  const { votes, isLoading } = useElectionVotes(electionCycleId)
  const { allAccounts } = useMyAccounts()

  if (isLoading) {
    return <Loading />
  }

  if (!votes) {
    return <NoData>No votes have been cast yet.</NoData>
  }

  return (
    <CandidateVoteList
      votes={votes.map((vote, index) => ({
        index,
        voteOwner: !!allAccounts.find((account) => account.address === vote.castBy),
        revealed: !!vote.voteFor,
        member: vote.voteFor,
        stake: new BN(100000),
        voteStake: vote.stake,
        votes: 10,
        revealedVotes: 1,
      }))}
    />
  )
}
