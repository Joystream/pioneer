import BN from 'bn.js'

import { CouncilMemberFieldsFragment } from '@/council/queries'
import { asMember, Member } from '@/memberships/types'

export interface Councilor {
  id: string
  member: Member
  numberOfTerms: number
  unpaidReward: BN
  stake: BN
  voterStake?: BN
}

export const asCouncilor = (fields: CouncilMemberFieldsFragment): Councilor => ({
  id: fields.id,
  member: asMember(fields.member),
  numberOfTerms: fields.member.councilMembers.length,
  unpaidReward: new BN(fields.unpaidReward),
  stake: new BN(fields.stake),
})
