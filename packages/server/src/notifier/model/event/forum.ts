import { difference, pick, uniq } from 'lodash'

import {
  PostAddedEventFieldsFragmentDoc,
  PostFieldsFragmentDoc,
  ThreadCreatedEventFieldsFragmentDoc,
  useFragment,
} from '@/common/queries'

import { NotifEventFromQNEvent, isOlderThan, getMentionedMemberIds, getParentCategories } from './utils'

export const fromPostAddedEvent: NotifEventFromQNEvent<'PostAddedEvent'> = async (event, buildEvents) => {
  const postAddedEvent = useFragment(PostAddedEventFieldsFragmentDoc, event)
  const post = useFragment(PostFieldsFragmentDoc, postAddedEvent.post)
  const authorId = Number(post.authorId)

  const mentionedMemberIds = difference(getMentionedMemberIds(post.text), [authorId])
  const earlierPosts = post.thread.posts.filter(isOlderThan(post))
  const earlierAuthors = difference(uniq(earlierPosts.map((post) => Number(post.authorId))), [authorId])
  const parentCategoryIds = await getParentCategories(post.thread.categoryId)

  const eventData = pick(postAddedEvent, 'inBlock', 'id')

  return buildEvents(eventData, post.id, ({ generalEvent, entityEvent }) => [
    generalEvent('FORUM_POST_MENTION', mentionedMemberIds),
    generalEvent('FORUM_THREAD_CREATOR', [Number(post.thread.authorId)]),
    generalEvent('FORUM_THREAD_CONTRIBUTOR', earlierAuthors),
    entityEvent('FORUM_WATCHED_THREAD', post.thread.id),
    ...parentCategoryIds.map((categoryId) => entityEvent('FORUM_WATCHED_CATEGORY_POST', categoryId)),
    generalEvent('FORUM_POST_ALL', 'ANY'),
  ])
}

export const fromThreadCreatedEvent: NotifEventFromQNEvent<'ThreadCreatedEvent'> = async (event, buildEvents) => {
  const threadCreatedEvent = useFragment(ThreadCreatedEventFieldsFragmentDoc, event)
  const authorId = Number(threadCreatedEvent.thread.authorId)

  const mentionedMemberIds = difference(getMentionedMemberIds(threadCreatedEvent.text), [authorId])
  const parentCategoryIds = await getParentCategories(threadCreatedEvent.thread.categoryId)

  const eventData = pick(threadCreatedEvent, 'inBlock', 'id')

  return buildEvents(eventData, threadCreatedEvent.thread.id, ({ generalEvent, entityEvent }) => [
    generalEvent('FORUM_THREAD_MENTION', mentionedMemberIds),
    ...parentCategoryIds.map((categoryId) => entityEvent('FORUM_WATCHED_CATEGORY_THREAD', categoryId)),
    generalEvent('FORUM_THREAD_ALL', 'ANY'),
  ])
}
