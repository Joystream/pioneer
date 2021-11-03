import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { useElectionVotes } from '@/council/hooks/useElectionVotes'
import { Election } from '@/council/types/Election'

import { CandidateCardList } from '../CandidateCard/CandidateCardList'
import { RevealingStageVotes } from '../CandidateVote/RevealingStageVotes'
import { ElectionTabs, RevealingStageTab } from '../ElectionTabs'

interface Props {
  election: Election | undefined
  isLoading?: boolean
}

export const RevealingStage = ({ election, isLoading }: Props) => {
  const [tab, setTab] = useState<RevealingStageTab>('results')
  const { votesPerCandidate, sumOfStakes: totalStake, isLoading: votesLoading } = useElectionVotes(election)
  const myVotesTotal = votesPerCandidate.filter((vote) => vote.myVotes.length).length

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <ElectionTabs
        stage="revealing"
        myVotes={myVotesTotal}
        tab={tab}
        onSetTab={(tab) => setTab(tab as RevealingStageTab)}
      />
      {election && ['results', 'myVotes'].includes(tab) && (
        <RevealingStageVotes
          isLoading={votesLoading}
          totalStake={totalStake}
          votesPerCandidate={votesPerCandidate}
          onlyMyVotes={tab === 'myVotes'}
        />
      )}
      {election && tab === 'candidates' && <CandidateCardList candidates={election.candidates} isLoading={isLoading} />}
    </>
  )
}
