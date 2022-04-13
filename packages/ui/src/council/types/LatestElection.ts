import { LatestElectionRoundFieldsFragment } from '@/council/queries'
import { asElectionCandidate } from '@/council/types/Candidate'

import { Election } from './Election'

export interface LatestElection extends Election {
  isFinished: boolean
}

export const asLatestElection = (fields: LatestElectionRoundFieldsFragment): LatestElection => ({
  cycleId: fields.cycleId,
  candidates: fields.candidates.map(asElectionCandidate),
  isFinished: fields.isFinished,
})
