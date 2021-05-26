import { Member } from '@/memberships/types'

export type ProposalStage =
  | 'DECIDING'
  | 'DORMANT'
  | 'GRACING'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'VETOED'
  | 'SLASHED'
  | 'REJECTED'

export interface Proposal {
  id: string
  createdAt: string
  title: string
  rationale: string
  stage: ProposalStage
  type: string
  proposer: Member
}

export interface PastProposal {
  id: string
  endedAt: string
  title: string
  rationale: string
  stage: ProposalStage
  type: string
  proposer: Member
}
