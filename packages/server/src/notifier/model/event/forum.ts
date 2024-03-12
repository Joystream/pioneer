import { pick, uniq } from 'lodash'

import {
  GetCurrentRolesQuery,
  PostAddedEventFieldsFragmentDoc,
  ThreadCreatedEventFieldsFragmentDoc,
  useFragment,
} from '@/common/queries'

import { NotifEventFromQNEvent, isOlderThan, getMentionedMemberIds, getParentCategories } from './utils'

export const fromPostAddedEvent: NotifEventFromQNEvent<'PostAddedEvent', [GetCurrentRolesQuery]> = async (
  event,
  buildEvents,
  roles
) => {
  const postAddedEvent = useFragment(PostAddedEventFieldsFragmentDoc, event)
  const post = postAddedEvent.post

  const mentionedMemberIds = getMentionedMemberIds(post.text, roles)
  const repliedToMemberId = post.repliesTo && [Number(post.repliesTo.authorId)]
  const earlierPosts = post.thread.posts.filter(isOlderThan(post))
  const earlierAuthors = uniq(earlierPosts.map((post) => Number(post.authorId)))
  const parentCategoryIds = await getParentCategories(post.thread.categoryId)

  const eventData = pick(postAddedEvent, 'inBlock', 'id')

  return buildEvents(eventData, post.id, [post.authorId], ({ generalEvent, entityEvent }) => [
    generalEvent('FORUM_POST_MENTION', mentionedMemberIds),
    generalEvent('FORUM_POST_REPLY', repliedToMemberId ?? []),
    generalEvent('FORUM_THREAD_CREATOR', [post.thread.authorId]),
    generalEvent('FORUM_THREAD_CONTRIBUTOR', earlierAuthors),
    entityEvent('FORUM_THREAD_ENTITY_POST', post.thread.id),
    ...parentCategoryIds.map((categoryId) => entityEvent('FORUM_CATEGORY_ENTITY_POST', categoryId)),
    generalEvent('FORUM_POST_ALL', 'ANY'),
  ])
}

export const fromThreadCreatedEvent: NotifEventFromQNEvent<'ThreadCreatedEvent', [GetCurrentRolesQuery]> = async (
  event,
  buildEvents,
  roles
) => {
  const threadCreatedEvent = useFragment(ThreadCreatedEventFieldsFragmentDoc, event)
  const thread = threadCreatedEvent.thread

  const mentionedMemberIds = getMentionedMemberIds(threadCreatedEvent.text, roles)
  const parentCategoryIds = await getParentCategories(thread.categoryId)

  const eventData = pick(threadCreatedEvent, 'inBlock', 'id')

  return buildEvents(eventData, thread.id, [thread.authorId], ({ generalEvent, entityEvent }) => [
    generalEvent('FORUM_THREAD_MENTION', mentionedMemberIds),
    ...parentCategoryIds.map((categoryId) => entityEvent('FORUM_CATEGORY_ENTITY_THREAD', categoryId)),
    generalEvent('FORUM_THREAD_ALL', 'ANY'),
  ])
}
