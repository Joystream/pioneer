import { Member } from '@/memberships/types'

import { ProposalStages, ProposalTypes } from '../constants'

export interface Proposal {
  id: string
  createdAt: string
  stage: keyof typeof ProposalStages
  type: keyof typeof ProposalTypes
  proposer: Member
}
