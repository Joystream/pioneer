import BN from 'bn.js'

import { BN_ZERO } from '@/common/constants'
import { ElectionRoundFieldsFragment } from '@/council/queries'
import { asElectionCandidate, ElectionCandidate } from '@/council/types/Candidate'

export type ElectionStage = 'announcing' | 'voting' | 'revealing' | 'inactive'

export interface Election {
  cycleId: number
  candidates: ElectionCandidate[]
  totalElectionStake: BN
}

export const asElection = (fields: ElectionRoundFieldsFragment): Election => ({
  cycleId: fields.cycleId,
  candidates: fields.candidates.filter((candidate) => candidate.status !== 'WITHDRAWN').map(asElectionCandidate),
  totalElectionStake: fields.candidates.reduce((prev, next) => prev.add(new BN(next.votePower)), BN_ZERO),
})
