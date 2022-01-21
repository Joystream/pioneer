import BN from 'bn.js'

import { Block } from '@/common/types'
import { Member } from '@/memberships/types'

export interface BountyContributionsFiltersState {
  contributorId?: string
  bountyId?: string
  createdAfter?: Date
}

export type BountyPeriod = 'funding' | 'working' | 'judgement' | 'withdrawal' | 'expired' | 'terminated'

export type EntrantResult = 'winner' | 'loser' | 'slashed'

export type BountyEntryStatus =
  | 'BountyEntryStatusWorking'
  | 'BountyEntryStatusWithdrawn'
  | BountyEntryStatusWinner
  | 'BountyEntryStatusPassed'
  | 'BountyEntryStatusRejected'
  | 'BountyEntryStatusCashedOut'

export const isBountyEntryStatusWinner = (status: BountyEntryStatus): status is BountyEntryStatusWinner => {
  return (status as BountyEntryStatusWinner)?.reward !== undefined
}

export type BountyEntryStatusWinner = {
  reward: number
}

export interface Contributor {
  actor: Member | undefined
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

type FundingPerpetual = {
  target: BN
}

export const isFundingLimited = (funding: FundingType): funding is FundingLimited => {
  return (funding as FundingLimited).minAmount !== undefined
}

export type ContractType = 'ContractOpen' | ContractClosed

export type ContractClosed = {
  whitelist: string[]
}

export type BountyStage = 'funding' | 'expired' | 'workSubmission' | 'judgment' | 'successful' | 'failed' | 'terminated'

export interface WorkEntry {
  id: string
  bountyId: string
  worker: Member
  hasSubmitted: boolean
  winner: boolean
  status: BountyEntryStatus
  works?: WorkInfo[]
  stake: BN
  passed: boolean
}

export interface WorkInfo {
  id: string
  title: string
  description: string
}

export interface WinnerEntry {
  entryId: string
  reward: BN
}

export interface BountyWork {
  id: string
  worker: Member
  title: string
  description: string
  status: BountyEntryStatus
  inBlock: Block
}

export interface BountyContribution {
  id: string
  contributor?: Member
  amount: BN
}

export interface Bounty {
  id: string
  title: string
  imageUri: string | null | undefined
  description: string
  createdAt: string
  cherry: BN
  entrantStake: BN
  creator?: Member
  oracle?: Member
  fundingType: FundingType
  workPeriod: number
  judgingPeriod: number
  stage: BountyStage
  totalFunding: BN
  entries?: WorkEntry[]
  inBlock: number
  contractType: ContractType
  contributors: Contributor[]
  discussionThreadId: string
}
