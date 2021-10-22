import React, { useState } from 'react'

import { CandidateCardList } from '@/council/components/election/CandidateCard/CandidateCardList'
import { ElectionTabs, VotingStageTab } from '@/council/components/election/ElectionTabs'
import { Election } from '@/council/types/Election'

interface VotingStageProps {
  election: Election | undefined
  isLoading?: boolean
}

export const VotingStage = ({ election, isLoading }: VotingStageProps) => {
  const [tab, setTab] = useState<VotingStageTab>('candidates')
  return (
    <>
      <ElectionTabs
        stage="voting"
        myVotes={undefined}
        tab={tab}
        onSetTab={(tab) => setTab(tab as VotingStageTab)}
      />
      <CandidateCardList candidates={election?.candidates} isLoading={isLoading} isVotingStage />
    </>
  )
}
