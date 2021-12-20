import BN from 'bn.js'

import { Block, maybeAsBlock } from '@/common/types'
import { sumStakes } from '@/common/utils/bn'
import { PastElectionRoundDetailedFieldsFragment, PastElectionRoundFieldsFragment } from '@/council/queries'
import { asElectionCandidate, ElectionCandidate } from '@/council/types/Candidate'
import { asPastElectionVote, PastElectionVote } from '@/council/types/Vote'

export interface ElectionVotingResult {
  candidate: ElectionCandidate
  totalStake: BN
  votes: PastElectionVote[]
}

export interface PastElection {
  id: string
  cycleId: number
  finishedAtBlock?: Block
  totalStake: BN
  totalCandidates: number
  revealedVotes: number
  totalVotes: number
}

export interface PastElectionWithDetails extends PastElection {
  votingResults: ElectionVotingResult[]
}

export const asPastElection = (fields: PastElectionRoundFieldsFragment): PastElection => ({
  id: fields.id,
  cycleId: fields.cycleId,
  finishedAtBlock: maybeAsBlock(fields.endedAtBlock, fields.endedAtTime, fields.endedAtNetwork),
  totalStake: sumStakes(fields.candidates),
  totalCandidates: fields.candidates.length,
  revealedVotes: fields.castVotes.filter((castVote) => castVote.voteForId).length,
  totalVotes: fields.castVotes.length,
})

export const asPastElectionWithDetails = (
  fields: PastElectionRoundDetailedFieldsFragment
): PastElectionWithDetails => ({
  ...asPastElection(fields),
  totalStake: sumStakes(fields.castVotes),
  votingResults: fields.candidates.map((candidate) => {
    const candidateVotes = fields.castVotes.filter(({ voteForId }) => voteForId === candidate.member.id)
    return {
      candidate: asElectionCandidate(candidate),
      votes: candidateVotes.map((castVote) =>
        asPastElectionVote({
          ...castVote,
          electionRound: fields.cycleId,
        })
      ),
      totalStake: sumStakes(candidateVotes),
    }
  }),
})
