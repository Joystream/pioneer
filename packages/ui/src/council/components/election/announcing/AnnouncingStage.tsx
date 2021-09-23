import BN from 'bn.js'
import React, { useState } from 'react'

import { Loading } from '@/common/components/Loading'
import { CandidateCardList } from '@/council/components/election/CandidateCard/CandidateCardList'
import { AnnouncingStageTab, ElectionTabs } from '@/council/components/election/ElectionTabs'
import { Election, ElectionCandidate } from '@/council/types/Election'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

import { NoCandidates } from './NoCandidates'

interface AnnouncingStageProps {
  election: Election
}

const isMyCandidate = (members: Member[], candidate: ElectionCandidate) => {
  return members.find((member) => member.id === candidate.member.id)
}

export const AnnouncingStage = ({ election }: AnnouncingStageProps) => {
  const { isLoading, members: myMembers } = useMyMemberships()
  const [tab, setTab] = useState<AnnouncingStageTab>('candidates')
  const myCandidates = election.candidates.filter((candidate) => isMyCandidate(myMembers, candidate))

  if (isLoading) {
    return <Loading text="Loading candidates.." />
  }

  const displayCandidates = (candidates: ElectionCandidate[]) => {
    if (!candidates.length) {
      return <NoCandidates />
    }

    return (
      <CandidateCardList
        candidates={candidates.map((candidate) => ({
          member: candidate.member,
          title: 'Some title',
          ...(candidate.stake && isMyCandidate(myMembers, candidate) ? { stake: new BN(candidate.stake) } : {}),
        }))}
      />
    )
  }
  return (
    <>
      <ElectionTabs
        stage="announcing"
        myCandidates={myCandidates.length}
        tab={tab}
        onSetTab={(tab) => setTab(tab as AnnouncingStageTab)}
      />
      {displayCandidates(tab === 'candidates' ? election.candidates : myCandidates)}
    </>
  )
}
