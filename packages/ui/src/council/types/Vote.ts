import BN from 'bn.js'

import { Address } from '@/common/types'
import { asMember, Member } from '@/memberships/types'

import { CastVoteFieldsFragment, PastElectionRoundDetailedFieldsFragment } from '../queries'

interface BaseVote {
  stake: BN
  stakeLocked: boolean
  castBy: Address
  cycleId: number
}

export interface Vote extends BaseVote {
  id: string
  createdAt: string
  commitment: string
  voteFor?: Member
}

export const asPastElectionVote = (
  fields: PastElectionRoundDetailedFieldsFragment['castVotes'][0] & { electionRound: number }
) => ({
  stake: new BN(fields.stake),
  stakeLocked: fields.stakeLocked,
  castBy: fields.castBy,
  cycleId: fields.electionRound,
})

export type PastElectionVote = BaseVote

export const asVote = (fields: CastVoteFieldsFragment): Vote => ({
  id: fields.id,
  createdAt: fields.createdAt,
  stake: new BN(fields.stake),
  stakeLocked: fields.stakeLocked,
  castBy: fields.castBy,
  commitment: fields.commitment,
  voteFor: fields.voteFor ? asMember(fields.voteFor) : undefined,
  cycleId: fields.electionRound.cycleId,
})
