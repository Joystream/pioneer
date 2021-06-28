import { asBlock, Block } from '@/common/types'
import { ProposalWithDetailsFieldsFragment, VoteFieldsFragment } from '@/proposals/queries'

import { asProposal, Proposal } from './proposals'

export interface ProposalWithDetails extends Proposal {
  votes: VoteFieldsFragment[]
  statusSetAtBlock: Block
  rationale: string
  exactExecutionBlock?: Block
}

export const asProposalWithDetails = (fields: ProposalWithDetailsFieldsFragment): ProposalWithDetails => ({
  ...asProposal(fields),
  votes: fields.votes,
  rationale: fields.description,
  statusSetAtBlock: asBlock(),
})
