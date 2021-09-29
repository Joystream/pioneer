import BN from 'bn.js'

import { asMember, Member } from '@/memberships/types'

import { CandidateFieldsFragment } from '../queries'

export interface Candidate {
  id: string
  stakingAccount: string
  rewardAccount: string
  stake: BN
  note: string
  title: string
  member: Member
}

export const asCandidate = (fields: CandidateFieldsFragment): Candidate => ({
  id: fields.id,
  stakingAccount: fields.stakingAccountId,
  rewardAccount: fields.rewardAccountId,
  stake: new BN(fields.stake),
  note: fields.note,
  member: asMember(fields.member),
  title: 'Candidate title',
})
