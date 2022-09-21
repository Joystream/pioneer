import React, { useMemo, useState } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Account } from '@/accounts/types'
import { TabProps, Tabs } from '@/common/components/Tabs'
import { applyOrder, Comparator } from '@/common/model/Comparator'
import { CandidateVoteList } from '@/council/components/election/CandidateVote/CandidateVoteList'
import { ElectionVotingResult, PastElectionWithDetails } from '@/council/types/PastElection'

interface PastElectionTabsProps {
  election: PastElectionWithDetails
}

const getMyVote = (votingResult: ElectionVotingResult, myAccounts: Account[]) => {
  return votingResult.votes.find((vote) => myAccounts.find((account) => account.address === vote.castBy))
}

const electionVotingResultComparator = (votingResult1: ElectionVotingResult, votingResult2: ElectionVotingResult) => {
  const stakeOutcome = Comparator<PastElectionWithDetails['votingResults'][number]>(true, 'totalStake').bigNumber(
    votingResult1,
    votingResult2
  )
  return stakeOutcome === 0 ? applyOrder(votingResult1.votes.length - votingResult2.votes.length, true) : stakeOutcome
}

export const PastElectionTabs = ({ election }: PastElectionTabsProps) => {
  const { allAccounts } = useMyAccounts()
  const [tab, setTab] = useState<'votingResults' | 'myVotes'>('votingResults')

  const sortedVotingResults = useMemo(() => {
    return election.votingResults.sort(electionVotingResultComparator)
  }, [election.votingResults.length])

  const myVotes = useMemo(() => {
    return sortedVotingResults.filter((votingResult) => !!getMyVote(votingResult, allAccounts))
  }, [sortedVotingResults?.length])

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
            count: myVotes.length,
          },
        ]
      : []),
  ]

  const displayVotingResults = (votingResults: ElectionVotingResult[]) => {
    return (
      <CandidateVoteList
        votes={votingResults.map((votingResult, index) => {
          const myVote = getMyVote(votingResult, allAccounts)

          return {
            candidateId: votingResult.candidate.id,
            revealed: !!myVote,
            member: votingResult.candidate.member,
            sumOfAllStakes: votingResult.totalStake,
            ownStake: myVote ? myVote.stake : undefined,
            totalStake: election.totalStake,
            votes: votingResult.votes.length,
            index: index + 1,
            myVotes: [],
          }
        })}
      />
    )
  }

  return (
    <>
      <Tabs tabs={tabs} tabsSize="xs" />
      {displayVotingResults(tab === 'votingResults' ? sortedVotingResults : myVotes)}
    </>
  )
}
