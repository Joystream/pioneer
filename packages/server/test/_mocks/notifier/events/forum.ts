import { maskFragment } from '@test/_mocks/utils'

import { GetNotificationEventsQuery, PostAddedEventFieldsFragment, PostFieldsFragment } from '@/common/queries'

type PostAddedEventsMock = { threadAuthor?: string | number; text?: string }
export const postAddedEvent = (
  post: number,
  thread: number,
  { threadAuthor = `threadAuthor:${thread}`, text = `text:${post}` }: PostAddedEventsMock = {}
): GetNotificationEventsQuery['events'][0] =>
  maskFragment(
    'PostAddedEventFields',
    'PostAddedEvent'
  )<PostAddedEventFieldsFragment>({
    id: `event:${post}`,
    inBlock: 1,
    post: maskFragment(
      'PostFields',
      'ForumPost'
    )<PostFieldsFragment>({
      id: `post:${post}`,
      authorId: `postAuthor:${post}`,
      createdAt: Date(),
      text,
      thread: { id: `thread:${thread}`, authorId: String(threadAuthor), posts: [], categoryId: `category:${post}` },
    }),
  })
