import { ProposalDiscussionPostStatus, ProposalVoteKind } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types'
import { ForumPost, PostStatusTypename } from '@/forum/types'
import { asMember, Member } from '@/memberships/types'
import { typenameToProposalStatus } from '@/proposals/model/proposalStatus'
import {
  DiscussionPostFieldsFragment,
  ProposalWithDetailsFieldsFragment,
  VoteFieldsFragment,
} from '@/proposals/queries'

import { asProposalDetails, ProposalDetails, ProposalExtraDetails } from './ProposalDetails'
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
  details: ProposalDetails
  discussionThread: ProposalDiscussionThread
}

const getWhitelist = (fields: ProposalWithDetailsFieldsFragment['discussionThread']['mode']): string[] | undefined => {
  if (fields.__typename === 'ProposalDiscussionThreadModeClosed') {
    return fields.whitelist?.members.map((member) => member.id)
  }
}

export const asProposalWithDetails = (
  fields: ProposalWithDetailsFieldsFragment,
  extraDetails: ProposalExtraDetails
): ProposalWithDetails => ({
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
    id: fields.discussionThread.id,
    discussionPosts: fields.discussionThread.posts.map(asForumComment),
    mode: fields.discussionThread.mode.__typename === 'ProposalDiscussionThreadModeOpen' ? 'open' : 'closed',
    whitelistIds: getWhitelist(fields.discussionThread.mode),
  },
  proposalStatusUpdates: fields.proposalStatusUpdates.map((status) => ({
    inBlock: asBlock(status),
    status: typenameToProposalStatus(status.newStatus.__typename),
  })),
  details: asProposalDetails(fields.details, extraDetails),
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
  id: string
  discussionPosts: ForumPost[]
  mode: 'open' | 'closed'
  whitelistIds?: string[]
}

const asDiscussionPostStatus = (status: ProposalDiscussionPostStatus['__typename']) => {
  return status.replace('ProposalDiscussion', '') as PostStatusTypename
}

const asForumComment = (fields: DiscussionPostFieldsFragment): ForumPost => ({
  id: fields.id,
  createdAt: fields.createdAt,
  createdAtBlock: asBlock(fields.createdInEvent),
  updatedAt: fields.updatedAt,
  author: asMember(fields.author),
  text: fields.text,
  ...(fields.repliesTo ? { repliesTo: asForumComment(fields.repliesTo) } : {}),
  status: asDiscussionPostStatus(fields.status.__typename),
  categoryId: '1',
  threadId: fields.discussionThread.id,
})
