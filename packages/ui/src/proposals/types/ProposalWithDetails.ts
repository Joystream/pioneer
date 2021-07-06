import { ProposalVoteKind } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types'
import { Member } from '@/memberships/types'
import { ProposalWithDetailsFieldsFragment } from '@/proposals/queries'

import { getMember } from '../../../test/_mocks/members'
import { typenameToProposalStatus } from '../model/proposalStatus'

import { asProposal, Proposal, ProposalStatus } from './proposals'

interface ProposalStatusUpdates {
  status: ProposalStatus
  inBlock: Block
}

export interface ProposalWithDetails extends Proposal {
  votes: ProposalVote[]
  statusSetAtBlock: Block
  statusSetAtTime: string
  rationale: string
  createdInBlock: Block
  proposalStatusUpdates: ProposalStatusUpdates[]
  exactExecutionBlock?: Block
}

export const asProposalWithDetails = (fields: ProposalWithDetailsFieldsFragment): ProposalWithDetails => ({
  ...asProposal(fields),
  votes: fields.votes.map(asProposalVote),
  rationale: fields.description,
  statusSetAtBlock: asBlock(),
  statusSetAtTime: fields.statusSetAtTime,
  createdInBlock: asBlock(),
  proposalStatusUpdates: fields.proposalStatusUpdates.map(({ newStatus }) => ({
    inBlock: asBlock(),
    status: typenameToProposalStatus(newStatus.__typename),
  })),
})

export interface ProposalVote {
  voteKind: ProposalVoteKind
  voter: Member
}

export const asProposalVote = ({ voteKind }: { voteKind: ProposalVoteKind }): ProposalVote => ({
  voteKind,
  voter: getMember('alice'),
})
