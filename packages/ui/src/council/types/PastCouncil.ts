import { BN_ZERO } from '@polkadot/util'
import BN from 'bn.js'

import { PastCouncilDetailedFieldsFragment, PastCouncilFieldsFragment } from '@/council/queries'

export interface PastCouncil {
  id: string
  endedAtBlock: number
}

export interface PastCouncilWithDetails extends PastCouncil {
  totalDebt: BN
  totalRewards: BN
}

export const asPastCouncil = (fields: PastCouncilFieldsFragment): PastCouncil => ({
  id: fields.id,
  endedAtBlock: fields.endedAtBlock as number,
})

export const asPastCouncilWithDetails = (fields: PastCouncilDetailedFieldsFragment): PastCouncilWithDetails => ({
  ...asPastCouncil(fields),
  totalDebt: fields.councilMembers.reduce((a, b) => a.addn(b.unpaidReward), BN_ZERO).neg(),
  totalRewards: fields.councilMembers.reduce((a, b) => a.addn(b.accumulatedReward), BN_ZERO),
})
