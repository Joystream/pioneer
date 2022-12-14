import React, { useMemo, useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { BN_ZERO } from '@/common/constants'
import { CandidateWithMyVotes, useMyCastVotes } from '@/council/hooks/useMyCastVotes'
import { useMyCurrentVotesCount } from '@/council/hooks/useMyCurrentVotesCount'
import { electionVotingResultComparator } from '@/council/model/electionVotingResultComparator'
import { Election } from '@/council/types/Election'

import { CandidateCardList } from '../CandidateCard/CandidateCardList'
import { RevealingStageVotes } from '../CandidateVote/RevealingStageVotes'
import { CurrentElectionTabs, RevealingStageTab } from '../CurrentElectionTabs'

interface Props {
  election: Election | undefined
  isLoading?: boolean
}

export const RevealingStage = ({ election, isLoading }: Props) => {
  const [tab, setTab] = useState<RevealingStageTab>('results')
  const { votesTotal } = useMyCurrentVotesCount(election?.cycleId)

  const { votes, isLoading: votesLoading } = useMyCastVotes(election?.cycleId)

  const sortedCandidatesWithVotes = useMemo((): CandidateWithMyVotes[] => {
    if (!election) return []

    return election.candidates
      .map((candidate) => {
        const myVotesForCandidate = votes?.filter((vote) => vote.optionId === candidate.member.id) ?? []

        return {
          ...candidate,
          myVotes: myVotesForCandidate,
          myStake: myVotesForCandidate.reduce((prev, next) => prev.add(next.stake), BN_ZERO),
        }
      })
      .sort(electionVotingResultComparator)
  }, [votes, election])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <CurrentElectionTabs
        stage="revealing"
        myVotes={votesTotal}
        tab={tab}
        onSetTab={(tab) => setTab(tab as RevealingStageTab)}
      />
      {election && ['results', 'myVotes'].includes(tab) && (
        <RevealingStageVotes
          isLoading={votesLoading}
          totalStake={election.totalElectionStake}
          candidateWithVotes={sortedCandidatesWithVotes}
          onlyMyVotes={tab === 'myVotes'}
        />
      )}
      {election && tab === 'candidates' && (
        <CandidateCardList candidates={sortedCandidatesWithVotes} isLoading={isLoading} />
      )}
    </>
  )
}
