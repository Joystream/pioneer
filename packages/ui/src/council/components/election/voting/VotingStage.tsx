import React, { useMemo, useState } from 'react'

import { CandidateCardList } from '@/council/components/election/CandidateCard/CandidateCardList'
import { ElectionTabs, VotingStageTab } from '@/council/components/election/ElectionTabs'
import { useStoredCastedVotes } from '@/council/hooks/useStoredCastedVotes'
import { Election } from '@/council/types/Election'

interface VotingStageProps {
  election: Election | undefined
  isLoading?: boolean
}

export const VotingStage = ({ election, isLoading }: VotingStageProps) => {
  const [tab, setTab] = useState<VotingStageTab>('candidates')

  const myVotes = useStoredCastedVotes(election?.cycleId)
  const optionIds = useMemo(() => myVotes?.map(({ optionId }) => optionId), [myVotes?.length])

  const [allCandidates, votedForCandidates] = useMemo(() => {
    const allCandidates = election?.candidates?.map((candidate) => ({
      ...candidate,
      voted: optionIds?.includes(candidate.member.id),
    }))
    const votedForCandidates = allCandidates?.filter(({ voted }) => voted)

    return [allCandidates, votedForCandidates]
  }, [optionIds?.length, election?.candidates.length])

  return (
    <>
      <ElectionTabs
        stage="voting"
        myVotes={votedForCandidates?.length}
        tab={tab}
        onSetTab={(tab) => setTab(tab as VotingStageTab)}
      />
      <CandidateCardList
        candidates={tab === 'candidates' ? allCandidates : votedForCandidates}
        isLoading={isLoading}
        isVotingStage
      />
    </>
  )
}
