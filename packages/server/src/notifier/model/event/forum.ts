import { pick, uniq } from 'lodash'

import { PostAddedEventFieldsFragmentDoc, PostFieldsFragmentDoc, useFragment } from '@/common/queries'

import {
  NotifEventFromQNEvent,
  isOlderThan,
  itemsExcept,
  mentionedMembersIdsFromText,
  getParentCategories,
} from './utils'

export const fromPostAddedEvent: NotifEventFromQNEvent<'PostAddedEvent'> = async (event, buildEvents) => {
  const postAddedEvent = useFragment(PostAddedEventFieldsFragmentDoc, event)
  const post = useFragment(PostFieldsFragmentDoc, postAddedEvent.post)

  const mentionedMemberIds = mentionedMembersIdsFromText(post.text)
  const earlierPosts = post.thread.posts.filter(isOlderThan(post))
  const earlierAuthors = uniq(itemsExcept(earlierPosts, 'authorId', post.authorId))
  const parentCategoryIds = await getParentCategories(post.thread.categoryId)

  const eventData = pick(postAddedEvent, 'inBlock', 'id')

  return buildEvents(eventData, post.id, ({ generalEvent, entityEvent }) => [
    generalEvent('FORUM_POST_MENTION', mentionedMemberIds),
    generalEvent('FORUM_THREAD_CREATOR', [post.thread.authorId]),
    generalEvent('FORUM_THREAD_CONTRIBUTOR', earlierAuthors),
    entityEvent('FORUM_WATCHED_THREAD', post.thread.id),
    ...parentCategoryIds.map((categoryId) => entityEvent('FORUM_WATCHED_CATEGORY_POST', categoryId)),
    generalEvent('FORUM_POST_ALL', 'ANY'),
  ])
}
