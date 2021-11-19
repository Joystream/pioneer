import React, { useMemo, useState } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { isDefined } from '@/common/utils'
import { CandidateCardList } from '@/council/components/election/CandidateCard/CandidateCardList'
import { ElectionTabs, VotingStageTab } from '@/council/components/election/ElectionTabs'
import { useMyCurrentVotesCount } from '@/council/hooks/useMyCurrentVotesCount'
import { useVerifiedVotingAttempts } from '@/council/hooks/useVerifiedVotingAttempts'
import { Election } from '@/council/types/Election'

interface VotingStageProps {
  election: Election | undefined
  isLoading?: boolean
}

export const VotingStage = ({ election, isLoading }: VotingStageProps) => {
  const [tab, setTab] = useState<VotingStageTab>('candidates')
  const { votesTotal } = useMyCurrentVotesCount(election?.cycleId)

  const { allAccounts } = useMyAccounts()
  const myVotes = useVerifiedVotingAttempts(election?.cycleId)
  const optionIds = useMemo(() => new Set(myVotes?.map(({ optionId }) => optionId)), [myVotes?.length])
  const canVote = isDefined(votesTotal) && allAccounts.length > votesTotal

  const [allCandidates, votedForCandidates] = useMemo(() => {
    const allCandidates = election?.candidates?.map((candidate) => ({
      ...candidate,
      voted: optionIds?.has(candidate.member.id),
    }))
    const votedForCandidates = allCandidates?.filter(({ voted }) => voted)

    return [allCandidates, votedForCandidates]
  }, [optionIds?.size, election?.candidates.length])

  return (
    <>
      <ElectionTabs
        stage="voting"
        myVotes={myVotes?.length && votesTotal}
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
