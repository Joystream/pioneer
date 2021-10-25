import React, { useMemo, useState } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { CandidateCardList } from '@/council/components/election/CandidateCard/CandidateCardList'
import { ElectionTabs, VotingStageTab } from '@/council/components/election/ElectionTabs'
import { VotingAttempt } from '@/council/hooks/useCommitment'
import { Election } from '@/council/types/Election'

interface VotingStageProps {
  election: Election | undefined
  isLoading?: boolean
}

export const VotingStage = ({ election, isLoading }: VotingStageProps) => {
  const [tab, setTab] = useState<VotingStageTab>('candidates')

  const [votingAttempts] = useLocalStorage<VotingAttempt[]>(election && `votes:${election.cycleId}`)
  const { allAccounts } = useMyAccounts()

  const optionIds = useMemo(() => {
    const addresses = allAccounts.map((account) => account.address)
    const myVotes = votingAttempts?.filter(({ accountId }) => addresses.includes(accountId))
    return myVotes?.map(({ optionId }) => optionId)
  }, [votingAttempts?.length, allAccounts.length])

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
