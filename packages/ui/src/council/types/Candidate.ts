import BN from 'bn.js'

import { asMember, Member } from '@/memberships/types'

import { CandidateDetailedFieldsFragment } from '../queries'

export interface CandidateWithDetails {
  id: string
  stakingAccount: string
  rewardAccount: string
  stake: BN
  title: string
  summary: string
  description: string[]
  bannerImageUri?: string
  member: Member
  cycleId: number
  cycleFinished: boolean
}

export const asCandidateWithDetails = (fields: CandidateDetailedFieldsFragment): CandidateWithDetails => ({
  id: fields.id,
  stakingAccount: fields.stakingAccountId,
  rewardAccount: fields.rewardAccountId,
  stake: new BN(fields.stake),
  member: asMember(fields.member),
  title: fields.noteMetadata.header ?? 'Candidate',
  description: fields.noteMetadata.bulletPoints,
  summary: fields.noteMetadata.description ?? '',
  bannerImageUri: fields.noteMetadata.bannerImageUri ?? undefined,
  cycleId: fields.electionRound.cycleId,
  cycleFinished: fields.electionRound.isFinished,
})
