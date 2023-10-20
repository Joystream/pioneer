import React, { useMemo, useState } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { NoData } from '@/common/components/NoData'
import { BN_ZERO } from '@/common/constants'
import { isDefined } from '@/common/utils'
import { CandidateCardList } from '@/council/components/election/CandidateCard/CandidateCardList'
import { CurrentElectionTabs, VotingStageTab } from '@/council/components/election/CurrentElectionTabs'
import { useMyCastVotes } from '@/council/hooks/useMyCastVotes'
import { useMyCurrentVotesCount } from '@/council/hooks/useMyCurrentVotesCount'
import { useVerifiedVotingAttempts } from '@/council/hooks/useVerifiedVotingAttempts'
import { CandidacyStatus } from '@/council/types'
import { Election } from '@/council/types/Election'

interface VotingStageProps {
  election: Election | undefined
  isLoading?: boolean
}

export const VotingStage = ({ election, isLoading }: VotingStageProps) => {
  const [tab, setTab] = useState<VotingStageTab>('candidates')
  const { votesTotal } = useMyCurrentVotesCount(election?.cycleId)
  const { votes } = useMyCastVotes(election?.cycleId)

  const { allAccounts } = useMyAccounts()
  const myVotes = useVerifiedVotingAttempts(election?.cycleId)
  const optionIds = useMemo(() => new Set(myVotes?.map(({ optionId }) => optionId)), [myVotes?.length])
  const canVote = isDefined(votesTotal) && allAccounts.length > votesTotal

  const [allCandidates, votedForCandidates] = useMemo(() => {
    const allCandidates = election?.candidates
      .filter((candidate) => candidate.status === CandidacyStatus.Active)
      .map((candidate) => ({
        ...candidate,
        voted: optionIds?.has(candidate.member.id),
      }))
    const votedForCandidates = allCandidates
      ?.filter(({ voted }) => voted)
      .map((candidate) => {
        const myVotesForCandidate = votes?.filter((vote) => vote.optionId === candidate.member.id) ?? []

        return {
          ...candidate,
          myVotes: myVotesForCandidate,
          myStake: myVotesForCandidate.reduce((prev, next) => prev.add(next.stake), BN_ZERO),
        }
      })

    return [allCandidates, votedForCandidates]
  }, [optionIds?.size, election?.candidates])

  return (
    <>
      <CurrentElectionTabs
        stage="voting"
        myVotes={votesTotal}
        tab={tab}
        onSetTab={(tab) => setTab(tab as VotingStageTab)}
      />
      {tab === 'myVotes' && !myVotes?.length ? (
        <NoData>
          Your votes will be shown in this list. Single member can vote multiple times with different accounts.
        </NoData>
      ) : (
        <CandidateCardList
          candidates={tab === 'candidates' ? allCandidates : votedForCandidates}
          isLoading={isLoading}
          canVote={canVote}
        />
      )}
    </>
  )
}
