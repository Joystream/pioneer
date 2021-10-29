import BN from 'bn.js'

import { Address } from '@/common/types'
import { asMember, Member } from '@/memberships/types'

import { CastVoteFieldsFragment, PastElectionRoundDetailedFieldsFragment } from '../queries'

export interface Vote {
  id: string
  createdAt: string
  stake: BN
  stakeLocked: boolean
  castBy: Address
  voteFor?: Member
  cycleId: number
}

export const asPastElectionVote = (
  fields: PastElectionRoundDetailedFieldsFragment['castVotes'][0] & { electionRound: number }
) => ({
  stake: new BN(fields.stake),
  stakeLocked: fields.stakeLocked,
  castBy: fields.castBy,
  cycleId: fields.electionRound,
})

export type PastElectionVote = ReturnType<typeof asPastElectionVote>

export const asVote = (fields: CastVoteFieldsFragment): Vote => ({
  id: fields.id,
  createdAt: fields.createdAt,
  stake: new BN(fields.stake),
  stakeLocked: fields.stakeLocked,
  castBy: fields.castBy,
  voteFor: fields.voteFor ? asMember(fields.voteFor) : undefined,
  cycleId: fields.electionRound.cycleId,
})
