import BN from 'bn.js'

import { Member } from '@/memberships/types'

export type BountyPeriod = 'funding' | 'working' | 'judgement' | 'withdrawal' | 'expired'

export type EntrantResult = 'winner' | 'loser' | 'slashed'

export interface Contributor {
  actor: Member
  amount: BN
}

export const isContributor = (actor: BountyActorItem): actor is Contributor => {
  return (actor as Contributor).amount !== undefined
}

export interface Entrant {
  actor: Member
  count: number
}

export const isEntrant = (actor: BountyActorItem): actor is Entrant => {
  return (actor as Entrant).count !== undefined
}

export interface Withdrawn {
  actor: Member
}

export type BountyActorItem = Contributor | Entrant | Withdrawn

export type FundingType = FundingLimited | FundingPerpetual

export const isPerpetual = (type: FundingType): type is FundingPerpetual => {
  return (type as FundingPerpetual).target !== undefined
}

export type FundingLimited = {
  minAmount: BN
  maxAmount: BN
  maxPeriod: number
}

export type FundingPerpetual = {
  target: BN
}

export type ContractType = 'ContractOpen' | ContractClosed

export type ContractClosed = {
  whitelist: string[]
}

export type BountyStage = 'funding' | 'expired' | 'workSubmission' | 'judgment' | 'successful' | 'failed' | 'terminate'

export interface EntryMiniature {
  createdById: string
  winner: boolean
  hasSubmitted: boolean
}

export interface Bounty {
  id: string
  title: string
  createdAt: string
  cherry: BN
  entrantStake: BN
  creator?: Member
  oracle?: Member
  fundingType: FundingType
  workPeriod: BN
  judgingPeriod: BN
  stage: BountyStage
  totalFunding: BN
  entries?: EntryMiniature[]
  contractType: ContractType
  contributors: string[]
}
