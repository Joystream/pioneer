import { BN_ZERO } from '@polkadot/util'
import BN from 'bn.js'

import {
  CouncilSpendingEventFieldsFragment,
  PastCouncilDetailedFieldsFragment,
  PastCouncilFieldsFragment,
} from '@/council/queries'

export interface PastCouncil {
  id: string
  endedAtBlock: number
}

export interface PastCouncilWithDetails extends PastCouncil {
  totalSpent: BN
  totalMissedRewards: BN
  totalPaidRewards: BN
  totalSpentOnProposals: BN
}

export const asPastCouncil = (fields: PastCouncilFieldsFragment): PastCouncil => ({
  id: fields.id,
  endedAtBlock: fields.endedAtBlock as number,
})

export const asPastCouncilWithDetails = (
  councilFields: PastCouncilDetailedFieldsFragment,
  spendingEvents: CouncilSpendingEventFieldsFragment[]
): PastCouncilWithDetails => {
  return {
    ...asPastCouncil(councilFields),
    totalSpent: spendingEvents.reduce((a, b) => a.addn(b.amount), BN_ZERO),
    totalMissedRewards: councilFields.councilMembers.reduce((a, b) => a.addn(b.unpaidReward), BN_ZERO).neg(),
    totalPaidRewards: councilFields.councilMembers.reduce((a, b) => a.addn(b.accumulatedReward), BN_ZERO),
    totalSpentOnProposals: BN_ZERO,
  }
}
