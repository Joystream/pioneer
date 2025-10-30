import { request } from 'graphql-request'
import { memoize } from 'lodash'

import { QUERY_NODE_ENDPOINT } from '@/common/config'
import { GetProposalDiscussionPostDocument } from '@/common/queries'

interface ProposalDiscussionPost {
  author: string
  proposal: string
  proposalId: string
}

export const getProposalPost = memoize(async (id: string): Promise<ProposalDiscussionPost> => {
  const { proposalDiscussionPostByUniqueInput: post } = await request(
    QUERY_NODE_ENDPOINT,
    GetProposalDiscussionPostDocument,
    { id }
  )
  if (!post) {
    throw Error(`Failed to fetch proposal discussion post ${id} on the QN`)
  }

  return {
    author: post.author.handle,
    proposal: post.discussionThread.proposal.title,
    proposalId: post.discussionThread.proposal.id,
  }
})
