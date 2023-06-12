import { ProposalWithDetailsFieldsFragment } from '@/proposals/queries'

import { member } from './members'
import forumPosts from './raw/forumPosts.json'

export type ProposalStatus = ProposalWithDetailsFieldsFragment['status']['__typename']

export const proposalActiveStatus = ['ProposalStatusDeciding', 'ProposalStatusDormant', 'ProposalStatusGracing']

const author = member('eve')
export const proposalDiscussionPosts = forumPosts.slice(0, 2).map(({ threadId, postAddedEvent, ...fields }) => ({
  ...fields,
  discussionThread: threadId,
  author,
  status: { __typename: 'ProposalDiscussionPostStatusActive' },
  createdInEvent: postAddedEvent,
}))
