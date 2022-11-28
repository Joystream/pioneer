import { ElectionRoundFieldsFragment } from '@/council/queries'
import { asElectionCandidate, ElectionCandidate } from '@/council/types/Candidate'

export type ElectionStage = 'announcing' | 'voting' | 'revealing' | 'inactive'

export interface Election {
  cycleId: number
  candidates: ElectionCandidate[]
}

export const asElection = (fields: ElectionRoundFieldsFragment): Election => ({
  cycleId: fields.cycleId,
  candidates: fields.candidates.filter((candidate) => candidate.status !== 'WITHDRAWN').map(asElectionCandidate),
})
