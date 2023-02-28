import {
  GetNotificationEventsQuery,
  PostAddedEventFieldsFragment,
  PostFieldsFragment,
} from '../../../../src/common/queries'
import { maskFragment } from '../../utils'

type PostAddedEventsMock = { threadAuthor?: string; text?: string }
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
      createdAt: Date.now(),
      text,
      thread: { id: `thread:${thread}`, authorId: threadAuthor, posts: [], category: { moderators: [] } },
    }),
  })
