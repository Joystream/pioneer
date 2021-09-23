import React from 'react'

import { Election } from '@/council/types/Election'

import { NoCandidates } from './NoCandidates'

interface AnnouncingStageProps {
  election: Election
}

export const AnnouncingStage = ({ election }: AnnouncingStageProps) => {
  return <NoCandidates />
}
