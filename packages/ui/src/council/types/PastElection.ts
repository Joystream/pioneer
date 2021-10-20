import BN from 'bn.js'

import { BN_ZERO } from '@/common/constants'
import { PastElectionRoundDetailedFieldsFragment, PastElectionRoundFieldsFragment } from '@/council/queries'
import { asElectionCandidate, ElectionCandidate } from '@/council/types/Candidate'
import { asVote, Vote } from '@/council/types/Vote'

export interface ElectionVotingResult {
  candidate: ElectionCandidate
  totalStake: BN
  votes: Vote[]
}

export interface PastElection {
  id: string
  cycleId: number
  finishedAt: string
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
  finishedAt: fields.updatedAt,
  totalStake: fields.candidates.reduce((a, b) => a.addn(b.stake), new BN(0)),
  totalCandidates: fields.candidates.length,
  revealedVotes: fields.castVotes.filter((castVote) => castVote.voteForId).length,
  totalVotes: fields.castVotes.length,
})

export const asPastElectionWithDetails = (
  fields: PastElectionRoundDetailedFieldsFragment
): PastElectionWithDetails => ({
  ...asPastElection(fields),
  totalStake: fields.castVotes.reduce((a, b) => a.addn(b.stake), BN_ZERO),
  votingResults: fields.candidates.map((candidate) => ({
    candidate: asElectionCandidate(candidate),
    votes: fields.castVotes
      .filter((castVote) => castVote.voteForId === candidate.member.id)
      .map((castVote) =>
        asVote({
          ...castVote,
          electionRound: { __typename: 'ElectionRound', cycleId: fields.cycleId },
        })
      ),
    totalStake: fields.castVotes
      .filter((castVote) => castVote.voteForId === candidate.member.id)
      .reduce((a, b) => a.addn(b.stake), BN_ZERO),
  })),
})
