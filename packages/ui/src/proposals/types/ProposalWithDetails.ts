import { ProposalVoteKind } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types'
import { ForumPost } from '@/forum/types'
import { asMember, Member } from '@/memberships/types'
import { typenameToProposalStatus } from '@/proposals/model/proposalStatus'
import {
  DiscussionPostFieldsFragment,
  ProposalWithDetailsFieldsFragment,
  VoteFieldsFragment,
} from '@/proposals/queries'

import { asProposalDetails, ProposalDetails } from './ProposalDetails'
import { asProposal, Proposal, ProposalStatus } from './proposals'

export interface ProposalStatusUpdates {
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
  discussionThread: ProposalDiscussionThread
}

export const asProposalWithDetails = (fields: ProposalWithDetailsFieldsFragment): ProposalWithDetails => ({
  ...asProposal(fields),
  votes: fields.votes.map(asProposalVote),
  rationale: fields.description,
  statusSetAtBlock: asBlock({
    inBlock: fields.statusSetAtBlock,
    createdAt: fields.statusSetAtTime,
    network: fields.createdInEvent.network,
  }),
  statusSetAtTime: fields.statusSetAtTime,
  createdInBlock: asBlock(fields.createdInEvent),
  discussionThread: {
    discussionPosts: fields.discussionThread.discussionPosts.map(asForumComment),
    mode: fields.discussionThread.mode.__typename === 'ProposalDiscussionThreadModeOpen' ? 'open' : 'close',
  },
  proposalStatusUpdates: fields.proposalStatusUpdates.map((status) => ({
    inBlock: asBlock(status),
    status: typenameToProposalStatus(status.newStatus.__typename),
  })),
  details: asProposalDetails(fields.details),
})

export interface ProposalVote {
  id: string
  voteKind: ProposalVoteKind
  voter: Member
  votingRound: number
}

export const asProposalVote = (voteFields: Omit<VoteFieldsFragment, '__typename'>): ProposalVote => ({
  id: voteFields.id,
  voteKind: voteFields.voteKind,
  voter: asMember(voteFields.voter),
  votingRound: voteFields.votingRound,
})

export interface ProposalDiscussionThread {
  discussionPosts: ForumPost[]
  mode: 'open' | 'close'
}

const asForumComment = (fields: DiscussionPostFieldsFragment): ForumPost => ({
  id: fields.id,
  createdAt: fields.createdAt,
  createdAtBlock: asBlock(fields.createdInEvent),
  updatedAt: fields.updatedAt,
  author: asMember(fields.author),
  text: fields.text,
  ...(fields.repliesTo ? { repliesTo: asForumComment(fields.repliesTo) } : {}),
})
