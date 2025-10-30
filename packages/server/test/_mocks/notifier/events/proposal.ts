import { maskFragment } from '@test/_mocks/utils'

import { GetNotificationEventsQuery, ProposalDiscussionPostCreatedEventFieldsFragment } from '@/common/queries'

type ProposalDiscussionPostCreatedEventMock = {
  proposal?: string
  proposalCreator?: string | number
  author?: string | number
  text?: string
  repliesTo?: string | number
  posts?: { author?: string | number }[]
}
export const proposalDiscussionPostCreatedEvent = (
  post: number,
  {
    proposal = `proposal:${post}`,
    proposalCreator = `creator:${proposal}`,
    author = `postAuthor:${post}`,
    text = `text:${post}`,
    repliesTo,
    posts,
  }: ProposalDiscussionPostCreatedEventMock = {}
): GetNotificationEventsQuery['events'][0] =>
  maskFragment(
    'ProposalDiscussionPostCreatedEventFields',
    'ProposalDiscussionPostCreatedEvent'
  )<ProposalDiscussionPostCreatedEventFieldsFragment>({
    id: `event:${post}`,
    inBlock: 1,
    post: {
      id: `post:${post}`,
      authorId: String(author),
      createdAt: Date(),
      text,
      repliesTo: { authorId: String(repliesTo) },
      discussionThread: {
        proposal: { id: String(proposal), creatorId: String(proposalCreator) },
        posts:
          posts?.map(({ author }) => ({
            authorId: String(author),
            createdAt: new Date(0).toString(),
          })) ?? [],
      },
    },
  })
