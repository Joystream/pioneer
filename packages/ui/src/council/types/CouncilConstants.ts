import { AugmentedConsts } from '@polkadot/api/types'
import BN from 'bn.js'

export interface CouncilConstants {
  size: number
  announcingPeriod: number
  budgetRefillPeriod: number
  idlePeriod: number
  election: {
    votingPeriod: number
    revealingPeriod: number
    minVoteStake: BN
    minCandidacyStake: BN
  }
}

export const asCouncilConstants = (
  council: AugmentedConsts<'rxjs'>['council'],
  referendum: AugmentedConsts<'rxjs'>['referendum']
): CouncilConstants => ({
  size: council.councilSize.toNumber(),
  announcingPeriod: council.announcingPeriodDuration.toNumber(),
  budgetRefillPeriod: council.budgetRefillPeriod.toNumber(),
  idlePeriod: council.idlePeriodDuration.toNumber(),
  election: {
    votingPeriod: referendum.voteStageDuration.toNumber(),
    revealingPeriod: referendum.revealStageDuration.toNumber(),
    minVoteStake: referendum.minimumStake,
    minCandidacyStake: council.minCandidateStake,
  },
})
