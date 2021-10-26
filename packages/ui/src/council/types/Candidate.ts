import BN from 'bn.js'

import { asMember, Member } from '@/memberships/types'

import { ElectionCandidateDetailedFieldsFragment, ElectionCandidateFieldsFragment } from '../queries'

export interface ElectionCandidate {
  id: string
  member: Member
  stake: BN
  info: {
    title: string
    bulletPoints: string[]
    bannerUri?: string
  }
}

export interface ElectionCandidateWithDetails extends ElectionCandidate {
  info: ElectionCandidate['info'] & { summary: string }
  stakingAccount: string
  rewardAccount: string
  cycleId: number
  cycleFinished: boolean
}

export const asElectionCandidate = (fields: ElectionCandidateFieldsFragment): ElectionCandidate => ({
  id: fields.id,
  member: asMember(fields.member),
  stake: new BN(fields.stake),
  info: {
    title: fields.noteMetadata.header ?? 'Candidate',
    bulletPoints: fields.noteMetadata.bulletPoints,
    bannerUri: fields.noteMetadata.bannerImageUri ?? undefined,
  },
})

export const asElectionCandidateWithDetails = (
  fields: ElectionCandidateDetailedFieldsFragment
): ElectionCandidateWithDetails => {
  const { info, ...candidateData } = asElectionCandidate(fields)
  return {
    ...candidateData,
    info: { ...info, summary: fields.noteMetadata.description ?? '' },
    stakingAccount: fields.stakingAccountId,
    rewardAccount: fields.rewardAccountId,
    cycleId: fields.electionRound.cycleId,
    cycleFinished: fields.electionRound.isFinished,
  }
}
