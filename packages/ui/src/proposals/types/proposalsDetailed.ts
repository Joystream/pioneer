import { asBlock, Block } from '@/common/types'
import { ProposalDetailedFieldsFragment, VoteFieldsFragment } from '@/proposals/queries'

import { asProposal, Proposal } from './proposals'

export interface ProposalDetailed extends Proposal {
  votes: VoteFieldsFragment[]
  statusSetAtBlock: Block
  rationale: string
  exactExecutionBlock?: Block
}

export const asDetailedProposal = (fields: ProposalDetailedFieldsFragment): ProposalDetailed => ({
  ...asProposal(fields),
  votes: fields.votes,
  rationale: fields.description,
  statusSetAtBlock: asBlock(),
})
