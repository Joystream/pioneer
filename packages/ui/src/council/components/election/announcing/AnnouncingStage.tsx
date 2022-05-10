import React, { useMemo, useState } from 'react'

import { CandidateCardList } from '@/council/components/election/CandidateCard/CandidateCardList'
import { AnnouncingStageTab, CurrentElectionTabs } from '@/council/components/election/CurrentElectionTabs'
import { CandidacyStatus } from '@/council/types'
import { Election } from '@/council/types/Election'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface AnnouncingStageProps {
  election: Election | undefined
  isLoading?: boolean
}

export const AnnouncingStage = ({ election, isLoading }: AnnouncingStageProps) => {
  const [tab, setTab] = useState<AnnouncingStageTab>('candidates')

  const { members: myMembers = [] } = useMyMemberships()
  const myMemberIds = useMemo(() => myMembers.map(({ id }) => id), [myMembers.length])

  const [allCandidates, myCandidates] = useMemo(() => {
    const allCandidates = election?.candidates
      .filter((candidate) => candidate.status === CandidacyStatus.Active)
      .map((candidate) => ({
        ...candidate,
        isMyCandidate: myMemberIds.includes(candidate.member.id),
      }))
    const myCandidates = allCandidates?.filter(({ isMyCandidate }) => isMyCandidate)

    return [allCandidates, myCandidates]
  }, [myMemberIds.length, election?.candidates])

  return (
    <>
      <CurrentElectionTabs
        stage="announcing"
        myCandidates={myCandidates?.length}
        tab={tab}
        onSetTab={(tab) => setTab(tab as AnnouncingStageTab)}
      />
      <CandidateCardList candidates={tab === 'candidates' ? allCandidates : myCandidates} isLoading={isLoading} />
    </>
  )
}
