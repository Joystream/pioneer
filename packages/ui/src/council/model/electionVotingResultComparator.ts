import BN from 'bn.js'

import { applyOrder, Comparator } from '@/common/model/Comparator'

export const electionVotingResultComparator = <T extends { totalStake: BN; votesNumber: number }>(
  votingResult1: T,
  votingResult2: T
) => {
  const stakeOutcome = Comparator<T>(true, 'totalStake').bigNumber(votingResult1, votingResult2)
  return stakeOutcome === 0 ? applyOrder(votingResult1.votesNumber - votingResult2.votesNumber, true) : stakeOutcome
}
