import { difference, pick, uniq } from 'lodash'

import { PostAddedEventFieldsFragmentDoc, ThreadCreatedEventFieldsFragmentDoc, useFragment } from '@/common/queries'

import { NotifEventFromQNEvent, isOlderThan, getMentionedMemberIds, getParentCategories } from './utils'

export const fromPostAddedEvent: NotifEventFromQNEvent<'PostAddedEvent'> = async (event, buildEvents) => {
  const postAddedEvent = useFragment(PostAddedEventFieldsFragmentDoc, event)
  const post = postAddedEvent.post
  const authorId = Number(post.authorId)

  const mentionedMemberIds = difference(getMentionedMemberIds(post.text), [authorId])
  const earlierPosts = post.thread.posts.filter(isOlderThan(post))
  const earlierAuthors = difference(uniq(earlierPosts.map((post) => Number(post.authorId))), [authorId])
  const parentCategoryIds = await getParentCategories(post.thread.categoryId)

  const eventData = pick(postAddedEvent, 'inBlock', 'id')

  // TODO: add FORUM_POST_REPLY support

  return buildEvents(eventData, post.id, ({ generalEvent, entityEvent }) => [
    generalEvent('FORUM_POST_MENTION', mentionedMemberIds),
    generalEvent('FORUM_THREAD_CREATOR', [Number(post.thread.authorId)]),
    generalEvent('FORUM_THREAD_CONTRIBUTOR', earlierAuthors),
    entityEvent('FORUM_THREAD_ENTITY_POST', post.thread.id),
    ...parentCategoryIds.map((categoryId) => entityEvent('FORUM_CATEGORY_ENTITY_POST', categoryId)),
    generalEvent('FORUM_POST_ALL', 'ANY'),
  ])
}

export const fromThreadCreatedEvent: NotifEventFromQNEvent<'ThreadCreatedEvent'> = async (event, buildEvents) => {
  const threadCreatedEvent = useFragment(ThreadCreatedEventFieldsFragmentDoc, event)
  const thread = threadCreatedEvent.thread
  const authorId = Number(thread.authorId)

  const mentionedMemberIds = difference(getMentionedMemberIds(threadCreatedEvent.text), [authorId])
  const parentCategoryIds = await getParentCategories(thread.categoryId)

  const eventData = pick(threadCreatedEvent, 'inBlock', 'id')

  return buildEvents(eventData, thread.id, ({ generalEvent, entityEvent }) => [
    generalEvent('FORUM_THREAD_MENTION', mentionedMemberIds),
    ...parentCategoryIds.map((categoryId) => entityEvent('FORUM_CATEGORY_ENTITY_THREAD', categoryId)),
    generalEvent('FORUM_THREAD_ALL', 'ANY'),
  ])
}
