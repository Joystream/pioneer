import BN from 'bn.js'

import { Member } from '@/memberships/types'

export type BountyPeriod = 'funding' | 'working' | 'judgement' | 'withdrawal' | 'expired'

export type EntrantResult = 'winner' | 'loser' | 'slashed'

export interface Contributor {
  actor: Member
  amount: BN
}

export interface Entrant {
  actor: Member
  count: number
}

export interface Withdrawn {
  actor: Member
}

export type BountyActorItem = Contributor | Entrant | Withdrawn
