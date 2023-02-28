import { PostAddedEventFieldsFragmentDoc, PostFieldsFragmentDoc, useFragment } from '@/common/queries'
import { isOlderThan, itemsExcept, mentionedMembersIdsFromText, unique } from '@/notifier/model/utils'

import { buildEvent, QNEvent, NotificationEvent } from '.'

export const fromPostAddedEvent = (event: QNEvent<'PostAddedEvent'>): NotificationEvent[] => {
  const postAddedEvent = useFragment(PostAddedEventFieldsFragmentDoc, event)
  const post = useFragment(PostFieldsFragmentDoc, postAddedEvent.post)
  const build = buildEvent(postAddedEvent.id, post.id)

  const mentionIds = mentionedMembersIdsFromText(post.text)
  const earlierPosts = post.thread.posts.filter(isOlderThan(post))
  const earlierAuthors = unique(itemsExcept(earlierPosts, 'authorId', post.authorId))

  return [
    ...build('FORUM_POST_MENTION', true, 9, { relatedMemberIds: mentionIds }),
    ...build('FORUM_THREAD_CREATOR', true, 7, { relatedMemberIds: [post.thread.authorId] }),
    ...build('FORUM_THREAD_CONTIBUTOR', true, 6, { relatedMemberIds: earlierAuthors }),
    ...build('FORUM_WATCHED_THREAD', false, 3, { relatedEntityId: post.thread.id }),
    ...build('FORUM_POST_ALL', false, 1),
  ]
}
