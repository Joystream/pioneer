import BN from 'bn.js'

import { asMember, Member } from '@/memberships/types'

import { CandidateFieldsFragment } from '../queries'

export interface Candidate {
  id: string
  stakingAccount: string
  rewardAccount: string
  stake: BN
  title: string
  summary: string
  description: string[]
  member: Member
  cycleId: number
}

export const asCandidate = (fields: CandidateFieldsFragment): Candidate => ({
  id: fields.id,
  stakingAccount: fields.stakingAccountId,
  rewardAccount: fields.rewardAccountId,
  stake: new BN(fields.stake),
  member: asMember(fields.member),
  title: 'Candidate title',
  summary: fields.note,
  description: fields.note.split(' ').slice(0, 5),
  cycleId: fields.cycleId.cycleId,
})
