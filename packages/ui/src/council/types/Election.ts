import { ElectionCandidateFieldsFragment, ElectionRoundFieldsFragment } from '@/council/queries'
import { asMember, Member } from '@/memberships/types'

export interface Election {
  cycleId: number
  candidates: ElectionCandidate[]
}

export interface ElectionCandidate {
  id: string
  member: Member
  stake: number
}

export const asElection = (fields: ElectionRoundFieldsFragment): Election => ({
  cycleId: fields.cycleId,
  candidates: fields.candidates.map(asElectionCandidate),
})

const asElectionCandidate = (fields: ElectionCandidateFieldsFragment): ElectionCandidate => ({
  id: fields.id,
  member: asMember(fields.member),
  stake: fields.stake,
})
