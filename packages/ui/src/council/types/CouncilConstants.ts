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
    minStake: BN
  }
}

export const asCouncilConstants = (
  council: AugmentedConsts<any>['council'],
  referendum: AugmentedConsts<any>['referendum']
): CouncilConstants => ({
  size: council.councilSize.toNumber(),
  announcingPeriod: council.announcingPeriodDuration.toNumber(),
  budgetRefillPeriod: council.budgetRefillPeriod.toNumber(),
  idlePeriod: council.idlePeriodDuration.toNumber(),
  election: {
    votingPeriod: referendum.voteStageDuration.toNumber(),
    revealingPeriod: referendum.revealStageDuration.toNumber(),
    minStake: referendum.minimumStake,
  },
})
