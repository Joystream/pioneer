import React from 'react'

import { CandidateCardList } from '@/council/components/election/CandidateCard/CandidateCardList'
import { Election } from '@/council/types/Election'

import { NoCandidates } from './NoCandidates'

interface AnnouncingStageProps {
  election: Election
}

export const AnnouncingStage = ({ election }: AnnouncingStageProps) => {
  if (!election.candidates.length) {
    return <NoCandidates />
  }

  return (
    <CandidateCardList
      candidates={election.candidates.map((candidate) => ({
        member: candidate.member,
        title: 'Some title',
      }))}
    />
  )
}
