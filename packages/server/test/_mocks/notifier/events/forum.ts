import { maskFragment } from '@test/_mocks/utils'

import {
  GetNotificationEventsQuery,
  PostAddedEventFieldsFragment,
  PostFieldsFragment,
  ThreadCreatedEventFieldsFragment,
} from '@/common/queries'

type PostAddedEventsMock = {
  category?: string
  thread?: string
  threadAuthor?: string | number
  author?: string | number
  text?: string
}
export const postAddedEvent = (
  post: number,
  {
    category = `category:${post}`,
    thread = `thread:${post}`,
    threadAuthor = `threadAuthor:${thread}`,
    author = `postAuthor:${post}`,
    text = `text:${post}`,
  }: PostAddedEventsMock = {}
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
      authorId: String(author),
      createdAt: Date(),
      text,
      thread: { id: thread, authorId: String(threadAuthor), posts: [], categoryId: category },
    }),
  })

type ThreadCreatedEventsMock = { category?: string; author?: string | number; text?: string }
export const threadCreatedEvent = (
  thread: number,
  {
    category = `category:${thread}`,
    author = `threadAuthor:${thread}`,
    text = `text:${thread}`,
  }: ThreadCreatedEventsMock = {}
): GetNotificationEventsQuery['events'][0] =>
  maskFragment(
    'ThreadCreatedEventFields',
    'ThreadCreatedEvent'
  )<ThreadCreatedEventFieldsFragment>({
    id: `event:${thread}`,
    inBlock: 1,
    thread: { id: `thread:${thread}`, categoryId: category, authorId: String(author) },
    text,
  })
