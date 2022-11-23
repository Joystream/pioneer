import { BN } from '@polkadot/util'

import { BN_ZERO } from '@/common/constants'
import { LatestElectionRoundFieldsFragment } from '@/council/queries'
import { asElectionCandidate } from '@/council/types/Candidate'

import { Election } from './Election'

export interface LatestElection extends Election {
  isFinished: boolean
}

export const asLatestElection = (fields: LatestElectionRoundFieldsFragment): LatestElection => ({
  cycleId: fields.cycleId,
  candidates: fields.candidates.map(asElectionCandidate),
  isFinished: fields.isFinished,
  totalElectionStake: fields.candidates.reduce((prev, next) => prev.add(new BN(next.votePower)), BN_ZERO),
})
