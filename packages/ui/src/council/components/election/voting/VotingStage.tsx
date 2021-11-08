import React, { useMemo, useState } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { CandidateCardList } from '@/council/components/election/CandidateCard/CandidateCardList'
import { ElectionTabs, VotingStageTab } from '@/council/components/election/ElectionTabs'
import { useVerifiedVotingAttempts } from '@/council/hooks/useVerifiedVotingAttempts'
import { Election } from '@/council/types/Election'

interface VotingStageProps {
  election: Election | undefined
  isLoading?: boolean
}

export const VotingStage = ({ election, isLoading }: VotingStageProps) => {
  const [tab, setTab] = useState<VotingStageTab>('candidates')

  const { allAccounts } = useMyAccounts()
  const myVotes = useVerifiedVotingAttempts(election?.cycleId)
  const optionIds = useMemo(() => myVotes?.map(({ optionId }) => optionId), [myVotes?.length])
  const canVote = !!myVotes && allAccounts.length > myVotes.length

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
        canVote={canVote}
      />
    </>
  )
}
