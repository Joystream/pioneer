import React, { useState } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Account } from '@/accounts/types'
import { TabProps, Tabs } from '@/common/components/Tabs'
import { CandidateVoteList } from '@/council/components/election/CandidateVote/CandidateVoteList'
import { ElectionVotingResult, PastElectionWithDetails } from '@/council/types/PastElection'

interface PastElectionTabsProps {
  election: PastElectionWithDetails
}

const getMyVote = (votingResult: ElectionVotingResult, myAccounts: Account[]) => {
  return votingResult.votes.find((vote) => myAccounts.find((account) => account.address === vote.castBy))
}

export const PastElectionTabs = ({ election }: PastElectionTabsProps) => {
  const { allAccounts } = useMyAccounts()
  const [tab, setTab] = useState<'votingResults' | 'myVotes'>('votingResults')
  const myVotes = election.votingResults.filter((votingResult) => !!getMyVote(votingResult, allAccounts))

  const tabs: TabProps[] = [
    {
      title: 'Voting Results',
      active: tab === 'votingResults',
      onClick: () => setTab('votingResults'),
    },
    ...(myVotes.length
      ? [
          {
            title: 'My Votes',
            active: tab === 'myVotes',
            onClick: () => setTab('myVotes'),
          },
        ]
      : []),
  ]

  const displayVotingResults = (votingResults: ElectionVotingResult[]) => {
    votingResults = votingResults.sort((a, b) => b.totalStake.sub(a.totalStake).toNumber())

    return (
      <CandidateVoteList
        votes={votingResults.map((votingResult, index) => {
          const myVote = getMyVote(votingResult, allAccounts)

          return {
            candidateId: votingResult.candidate.id,
            revealed: false,
            member: votingResult.candidate.member,
            sumOfAllStakes: votingResult.totalStake,
            ownStake: myVote ? myVote.stake : undefined,
            totalStake: election.totalStake,
            votes: votingResult.votes.length,
            index: index + 1,
          }
        })}
      />
    )
  }

  return (
    <>
      <Tabs tabs={tabs} tabsSize="xs" />
      {displayVotingResults(tab === 'votingResults' ? election.votingResults : myVotes)}
    </>
  )
}
