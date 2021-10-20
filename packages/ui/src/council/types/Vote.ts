import BN from 'bn.js'

import { Address } from '@/common/types'
import { asMember, Member } from '@/memberships/types'

import { CastVoteFieldsFragment } from '../queries'

export interface Vote {
  stake: BN
  stakeLocked: boolean
  castBy: Address
  voteFor?: Member
  cycleId: number
}

export const asVote = (fields: CastVoteFieldsFragment): Vote => ({
  stake: new BN(fields.stake),
  stakeLocked: fields.stakeLocked,
  castBy: fields.castBy,
  voteFor: fields.voteFor ? asMember(fields.voteFor) : undefined,
  cycleId: fields.electionRound.cycleId,
})
