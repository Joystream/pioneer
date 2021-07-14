import { ProposalVoteKind } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types'
import { Member } from '@/memberships/types'
import { ProposalWithDetailsFieldsFragment, VoteFieldsFragment } from '@/proposals/queries'

import { getMember } from '../../../test/_mocks/members'
import { typenameToProposalStatus } from '../model/proposalStatus'

import { asProposalDetails, ProposalDetails } from './ProposalDetails'
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
  details: ProposalDetails
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
  details: asProposalDetails(fields.details),
})

export interface ProposalVote {
  id: string
  voteKind: ProposalVoteKind
  voter: Member
}

export const asProposalVote = (voteFields: Omit<VoteFieldsFragment, '__typename'>): ProposalVote => ({
  id: voteFields.id,
  voteKind: voteFields.voteKind,
  voter: getMember('alice'),
})
