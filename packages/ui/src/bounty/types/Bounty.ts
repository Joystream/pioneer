import { Member } from "@/memberships/types";
import BN from "bn.js";

export type BountyPeriod = 'funding' | 'working' | 'judgement' | 'withdrawal' | 'expired'

export type FundingType = FundingLimited | FundingPerpetual

type FundingLimited = {
  minAmount: BN
  maxAmount: BN
  maxPeriod: number
}

type FundingPerpetual = {
  target: BN
}

export type BountyStage =
  | 'funding'
  | 'expired'
  | 'workSubmission'
  | 'judgment'
  | 'successful'
  | 'failed'
  | 'terminate'

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
} 
