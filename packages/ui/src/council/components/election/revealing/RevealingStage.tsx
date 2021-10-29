import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { useMyCurrentVotesCount } from '@/council/hooks/useMyCurrentVotesCount'
import { Election } from '@/council/types/Election'

import { CandidateCardList } from '../CandidateCard/CandidateCardList'
import { ElectionVotes } from '../CandidateVote/ElectionVotes'
import { ElectionTabs, RevealingStageTab } from '../ElectionTabs'

interface Props {
  election: Election | undefined
  isLoading?: boolean
}

export const RevealingStage = ({ election, isLoading }: Props) => {
  const [tab, setTab] = useState<RevealingStageTab>('results')
  const { votesTotal, isLoading: votesTotalLoading } = useMyCurrentVotesCount(election?.cycleId)

  if (isLoading || votesTotalLoading) {
    return <Loading />
  }

  return (
    <>
      <ElectionTabs
        stage="revealing"
        myVotes={votesTotal}
        tab={tab}
        onSetTab={(tab) => setTab(tab as RevealingStageTab)}
      />
      {election && ['results', 'myVotes'].includes(tab) && (
        <ElectionVotes election={election} onlyMyVotes={tab === 'myVotes'} />
      )}
      {election && tab === 'candidates' && <CandidateCardList candidates={election.candidates} isLoading={isLoading} />}
    </>
  )
}
