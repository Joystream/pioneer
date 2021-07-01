import { ProposalVoteKind } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types'
import { Member } from '@/memberships/types'
import { ProposalWithDetailsFieldsFragment } from '@/proposals/queries'

import { getMember } from '../../../test/_mocks/members'

import { asProposal, Proposal } from './proposals'

export interface ProposalWithDetails extends Proposal {
  votes: ProposalVote[]
  statusSetAtBlock: Block
  rationale: string
  exactExecutionBlock?: Block
}

export const asProposalWithDetails = (fields: ProposalWithDetailsFieldsFragment): ProposalWithDetails => ({
  ...asProposal(fields),
  votes: fields.votes.map(asProposalVote),
  rationale: fields.description,
  statusSetAtBlock: asBlock(),
})

export interface ProposalVote {
  voteKind: ProposalVoteKind
  voter: Member
}

export const asProposalVote = ({ voteKind }: { voteKind: ProposalVoteKind }): ProposalVote => ({
  voteKind,
  voter: getMember('alice'),
})
