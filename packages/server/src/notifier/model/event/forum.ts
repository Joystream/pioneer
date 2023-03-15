import { pick, uniq } from 'lodash'

import { PostAddedEventFieldsFragmentDoc, PostFieldsFragmentDoc, useFragment } from '@/common/queries'

import { BuildEvents } from './utils/buildEvent'
import { NotificationEvent, QNEvent } from './utils/types'
import { isOlderThan, itemsExcept, mentionedMembersIdsFromText } from './utils/utils'

export const fromPostAddedEvent = (event: QNEvent<'PostAddedEvent'>, buildEvents: BuildEvents): NotificationEvent => {
  const postAddedEvent = useFragment(PostAddedEventFieldsFragmentDoc, event)
  const post = useFragment(PostFieldsFragmentDoc, postAddedEvent.post)

  const mentionedMemberIds = mentionedMembersIdsFromText(post.text)
  const earlierPosts = post.thread.posts.filter(isOlderThan(post))
  const earlierAuthors = uniq(itemsExcept(earlierPosts, 'authorId', post.authorId))

  const eventData = pick(postAddedEvent, 'inBlock', 'id')

  return buildEvents(eventData, post.id, ({ generalEvent, entityEvent }) => [
    generalEvent('FORUM_POST_MENTION', mentionedMemberIds),
    generalEvent('FORUM_THREAD_CREATOR', [post.thread.authorId]),
    generalEvent('FORUM_THREAD_CONTIBUTOR', earlierAuthors),
    entityEvent('FORUM_WATCHED_THREAD', post.thread.id),
    generalEvent('FORUM_POST_ALL', 'ANY'),
  ])
}
