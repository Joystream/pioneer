import { maskFragment } from '@test/_mocks/utils'

import {
  GetNotificationEventsQuery,
  PostAddedEventFieldsFragment,
  PostFieldsFragment,
  ThreadCreatedEventFieldsFragment,
} from '@/common/queries'

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

type ThreadCreatedEventsMock = { text?: string; category?: string }
export const threadCreatedEvent = (
  thread: number,
  { text = `text:${thread}`, category = `category:${thread}` }: ThreadCreatedEventsMock = {}
): GetNotificationEventsQuery['events'][0] =>
  maskFragment(
    'ThreadCreatedEventFields',
    'ThreadCreatedEvent'
  )<ThreadCreatedEventFieldsFragment>({
    id: `event:${thread}`,
    inBlock: 1,
    thread: { id: `thread:${thread}`, categoryId: category },
    text,
  })
