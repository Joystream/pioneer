import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { useStoredCastVotes } from '@/council/hooks/useStoredCastVotes'
import { Election } from '@/council/types/Election'

import { ElectionVotes } from '../CandidateVote/ElectionVotes'
import { ElectionTabs, RevealingStageTab } from '../ElectionTabs'

interface Props {
  election: Election | undefined
  isLoading?: boolean
}

export const RevealingStage = ({ election, isLoading }: Props) => {
  const [tab, setTab] = useState<RevealingStageTab>('results')

  const myVotes = useStoredCastVotes(election?.cycleId)

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <ElectionTabs stage="revealing" tab={tab} onSetTab={(tab) => setTab(tab as RevealingStageTab)} />
      {election && <ElectionVotes election={election} />}
    </>
  )
}
