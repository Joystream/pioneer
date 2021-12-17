import BN from 'bn.js'
import { Member } from "@/memberships/types"

export type BountyPeriod = 'funding' | 'working' | 'judgement' | 'withdrawal' | 'expired'

export type EntrantResult = 'winner' | 'loser' | 'slashed'

export interface BountyActorItem {
  actor: Member
  amount?: BN
  count?: number
}
