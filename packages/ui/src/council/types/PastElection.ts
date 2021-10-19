import BN from 'bn.js'

import { PastElectionRoundFieldsFragment } from '@/council/queries'

export interface PastElection {
  id: string
  cycleId: number
  finishedAt: string
  totalStake: BN
  totalCandidates: number
  revealedVotes: number
  totalVotes: number
}

export const asPastElection = (fields: PastElectionRoundFieldsFragment): PastElection => ({
  id: fields.id,
  cycleId: fields.cycleId,
  finishedAt: fields.updatedAt,
  totalStake: fields.candidates.reduce((a, b) => a.addn(b.stake), new BN(0)),
  totalCandidates: fields.candidates.length,
  revealedVotes: fields.castVotes.filter((castVote) => castVote.voteForId).length,
  totalVotes: fields.castVotes.length,
})
