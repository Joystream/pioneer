import BN from 'bn.js'

import { Block } from '@/common/types'
import { Member } from '@/memberships/types'

export interface BountyContributionsFiltersState {
  contributorId?: string
  bountyId?: string
  createdAfter?: Date
}

export type BountyPeriod = 'funding' | 'working' | 'judgement' | 'expired' | 'terminated' | 'failed' | 'successful'

export type BountyPeriodFilters =
  | 'funding'
  | 'working'
  | 'judgement'
  | 'expired'
  | 'Terminated - successful'
  | 'Terminated - failed'
  | 'Terminated - funding'

export type EntrantResult = 'winner' | 'loser' | 'slashed'

export type BountyEntryStatus =
  | 'BountyEntryStatusWorking'
  | 'BountyEntryStatusWithdrawn'
  | 'BountyEntryStatusWinner'
  | 'BountyEntryStatusPassed'
  | 'BountyEntryStatusRejected'

export interface Contributor {
  hasWithdrawn: boolean
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

export interface PeriodsLengthsType {
  fundingPeriodLength?: number
  workPeriodLength: number
  judgingPeriodLength: number
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
  rejected: boolean
  withdrawn: boolean
  reward?: BN
  hasCashedOut: boolean
}

export interface WorkInfo {
  id: string
  title: string
  description: string
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
  imageUri: string | undefined
  description: string
  createdAt: string
  cherry: BN
  entrantStake: BN
  entrantWhitelist: string[] | undefined
  creator?: Member
  oracle?: Member
  fundingType: FundingType
  workPeriod: number
  judgingPeriod: number
  stage: BountyStage
  isTerminated: boolean
  totalFunding: BN
  entries?: WorkEntry[]
  inBlock: number
  contributors: Contributor[]
  discussionThreadId: string | undefined
  judgement?: {
    inBlock?: Block
    rationale?: string | null
  }
  periodTimeLeft?: number
}
