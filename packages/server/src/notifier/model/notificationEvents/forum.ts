import { PostAddedEventFieldsFragmentDoc, PostFieldsFragmentDoc, useFragment } from '@/common/queries'
import { isOlderThan, itemsExcept, mentionedMembersIdsFromText, toNumbers, unique } from '@/notifier/model/utils'

import { buildEvents, QNEvent, NotificationEvent } from '.'

export const fromPostAddedEvent = (event: QNEvent<'PostAddedEvent'>): NotificationEvent[] => {
  const postAddedEvent = useFragment(PostAddedEventFieldsFragmentDoc, event)
  const post = useFragment(PostFieldsFragmentDoc, postAddedEvent.post)

  const mentionedMemberIds = mentionedMembersIdsFromText(post.text)
  const earlierPosts = post.thread.posts.filter(isOlderThan(post))
  const earlierAuthors = unique(itemsExcept(earlierPosts, 'authorId', post.authorId))

  return buildEvents(postAddedEvent.id, post.id, ({ generalEvent, entityEvent, memberEvent }) => [
    memberEvent('FORUM_POST_MENTION', mentionedMemberIds),
    memberEvent('FORUM_THREAD_CREATOR', toNumbers([post.thread.authorId])),
    memberEvent('FORUM_THREAD_CONTIBUTOR', toNumbers(earlierAuthors)),
    entityEvent('FORUM_WATCHED_THREAD', post.thread.id),
    generalEvent('FORUM_POST_ALL'),
  ])
}
