import { ProposalVoteKind } from '@/common/api/queries'
import { asBlock, Block, ForumPost } from '@/common/types'
import { asMember, Member } from '@/memberships/types'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { typenameToProposalStatus } from '@/proposals/model/proposalStatus'
import {
  DiscussionPostFieldsFragment,
  ProposalWithDetailsFieldsFragment,
  VoteFieldsFragment,
} from '@/proposals/queries'

import { getMember } from '../../../test/_mocks/members'

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
  statusSetAtBlock: asBlock(),
  statusSetAtTime: fields.statusSetAtTime,
  createdInBlock: asBlock(),
  discussionThread: {
    discussionPosts: fields.discussionThread.discussionPosts.map(asForumComment(fields.id)),
    mode: fields.discussionThread.mode.__typename === 'ProposalDiscussionThreadModeOpen' ? 'open' : 'close',
  },
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
  votingRound: number
}

export const asProposalVote = (voteFields: Omit<VoteFieldsFragment, '__typename'>): ProposalVote => ({
  id: voteFields.id,
  voteKind: voteFields.voteKind,
  voter: getMember('alice'),
  votingRound: voteFields.votingRound,
})

export interface ProposalDiscussionThread {
  discussionPosts: ForumPost[]
  mode: 'open' | 'close'
}

export const asForumComment = (proposalId: string) => (fields: DiscussionPostFieldsFragment): ForumPost => ({
  id: fields.id,
  link: `${ProposalsRoutes.preview}/${proposalId}/post/${fields.id}`,
  createdAtBlock: asBlock(),
  updatedAt: fields.updatedAt,
  author: asMember(fields.author),
  text: fields.text,
  ...(fields.repliesTo ? { repliesTo: asForumComment(proposalId)(fields.repliesTo) } : {}),
})
