import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { useRefetch } from '@/common/hooks/useRefetch'
import { useElectionVotes } from '@/council/hooks/useElectionVotes'
import { useMyCurrentVotesCount } from '@/council/hooks/useMyCurrentVotesCount'
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

  const {
    votesPerCandidate,
    sumOfStakes: totalStake,
    isLoading: votesLoading,
    refetch: refetchVotes,
  } = useElectionVotes(election)

  useRefetch({ type: 'set', payload: refetchVotes })

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
          totalStake={totalStake}
          votesPerCandidate={votesPerCandidate}
          onlyMyVotes={tab === 'myVotes'}
        />
      )}
      {election && tab === 'candidates' && <CandidateCardList candidates={election.candidates} isLoading={isLoading} />}
    </>
  )
}
