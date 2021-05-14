import { Member } from '@/memberships/types'

export type ProposalStage =
  | 'DECIDING'
  | 'DORMANT'
  | 'GRACING'
  | 'SUCCEDED'
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
