import { Member } from '@/memberships/types'

export type ProposalStage =
  | 'Deciding'
  | 'Dormant'
  | 'Gracing'
  | 'Succeeded'
  | 'Failed'
  | 'Vetoed'
  | 'Slashed'
  | 'Rejected'

export interface Proposal {
  id: string
  createdAt: string
  endedAt?: string
  title: string
  rationale: string
  stage: ProposalStage
  type: string
  proposer: Member
}
