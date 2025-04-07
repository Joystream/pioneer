import BN from 'bn.js'

import { BN_ZERO } from '@/common/constants'
import { sumStakes } from '@/common/utils/bn'
import { ElectionRoundFieldsFragment } from '@/council/queries'
import { asElectionCandidate, ElectionCandidate } from '@/council/types/Candidate'

export type ElectionStage = 'announcing' | 'voting' | 'revealing' | 'inactive'

export interface Election {
  cycleId: number
  candidates: ElectionCandidate[]
  totalElectionStake: BN
  revealedVotes: number
  totalRevealedVoteStake: BN
}

export const asElection = (fields: ElectionRoundFieldsFragment): Election => {
  const revealedVotesArray = fields.castVotes.filter((castVote) => castVote.voteForId)
  return {
    cycleId: fields.cycleId,
    candidates: fields.candidates.filter((candidate) => candidate.status !== 'WITHDRAWN').map(asElectionCandidate),
    totalElectionStake: fields.candidates.reduce((prev, next) => prev.add(new BN(next.votePower)), BN_ZERO),
    revealedVotes: revealedVotesArray.length,
    totalRevealedVoteStake: sumStakes(revealedVotesArray),
  }
}
