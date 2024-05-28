import { pick, uniq } from 'lodash'

import {
  GetCurrentRolesQuery,
  ProposalDiscussionPostCreatedEventFieldsFragmentDoc,
  useFragment,
} from '@/common/queries'

import { NotifEventFromQNEvent, isOlderThan, getMentionedMemberIds } from './utils'

export const fromProposalPostAddedEvent: NotifEventFromQNEvent<
  'ProposalDiscussionPostCreatedEvent',
  [GetCurrentRolesQuery]
> = async (event, buildEvents, roles) => {
  const postCreatedEvent = useFragment(ProposalDiscussionPostCreatedEventFieldsFragmentDoc, event)
  const post = postCreatedEvent.post

  const mentionedMemberIds = getMentionedMemberIds(post.text, roles)
  const repliedToMemberId = post.repliesTo && [Number(post.repliesTo.authorId)]
  const earlierPosts = post.discussionThread.posts.filter(isOlderThan(post))
  const earlierAuthors = uniq(earlierPosts.map((post) => Number(post.authorId)))

  const eventData = pick(postCreatedEvent, 'inBlock', 'id')

  return buildEvents(eventData, post.id, [post.authorId], ({ generalEvent, entityEvent }) => [
    generalEvent('PROPOSAL_DISCUSSION_MENTION', mentionedMemberIds),
    generalEvent('PROPOSAL_DISCUSSION_REPLY', repliedToMemberId ?? []),
    generalEvent('PROPOSAL_DISCUSSION_CREATOR', [post.discussionThread.proposal.creatorId]),
    generalEvent('PROPOSAL_DISCUSSION_CONTRIBUTOR', earlierAuthors),
    entityEvent('PROPOSAL_ENTITY_DISCUSSION', post.discussionThread.proposal.id),
    generalEvent('PROPOSAL_DISCUSSION_ALL', 'ANY'),
  ])
}
