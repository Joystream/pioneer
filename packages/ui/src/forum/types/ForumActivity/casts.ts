import { asBaseActivity, asMemberDisplayFields } from '@/common/types'
import { NarrowQueryResult } from '@/common/utils/casting'
import {
  CategoryCreatedEventFieldsFragment,
  CategoryDeletedEventFieldsFragment,
  GetForumEventsQuery,
  PostAddedEventFieldsFragment,
  PostDeletedEventFieldsFragment,
  PostModeratedEventFieldsFragment,
  PostTextUpdatedEventFieldsFragment,
  ThreadCreatedEventFieldsFragment,
  ThreadDeletedEventFieldsFragment,
  ThreadModeratedEventFieldsFragment,
} from '@/forum/queries'

import {
  CategoryDeletedActivity,
  ForumActivity,
  PostDeletedActivity,
  PostModeratedActivity,
  ThreadDeletedActivity,
  ThreadModeratedActivity,
} from '.'
import { CategoryCreatedActivity, PostAddedActivity, PostEditedActivity, ThreadCreatedActivity } from './types'

export function asPostActivity(
  fields: PostAddedEventFieldsFragment | PostTextUpdatedEventFieldsFragment
): PostAddedActivity | PostEditedActivity {
  return {
    eventType: fields.__typename,
    ...asBaseActivity(fields),
    postId: fields.post.id,
    threadId: fields.post.thread.id,
    author: asMemberDisplayFields(fields.post.author),
  }
}

export function asThreadCreatedActivity(fields: ThreadCreatedEventFieldsFragment): ThreadCreatedActivity {
  return {
    eventType: fields.__typename,
    ...asBaseActivity(fields),
    thread: {
      id: fields.thread.id,
      title: fields.thread.title,
    },
    category: {
      id: fields.thread.category.id,
      title: fields.thread.category.title,
    },
    author: asMemberDisplayFields(fields.thread.author),
  }
}

export function asThreadDeletedActivity(fields: ThreadDeletedEventFieldsFragment): ThreadDeletedActivity {
  return {
    eventType: fields.__typename,
    ...asBaseActivity(fields),
    thread: {
      id: fields.thread.id,
      title: fields.thread.title,
    },
  }
}

export function asThreadModeratedActivity(fields: ThreadModeratedEventFieldsFragment): ThreadModeratedActivity {
  return {
    eventType: fields.__typename,
    ...asBaseActivity(fields),
    thread: {
      id: fields.thread.id,
      title: fields.thread.title,
    },
    actor: asMemberDisplayFields(fields.actor.membership),
  }
}

export function asPostModeratedActivity(fields: PostModeratedEventFieldsFragment): PostModeratedActivity {
  return {
    eventType: fields.__typename,
    ...asBaseActivity(fields),
    postId: fields.post.id,
    threadId: fields.post.thread.id,
    actor: { id: fields.actor.membership.id, handle: fields.actor.membership.handle },
  }
}

export function asPostDeletedActivity(fields: PostDeletedEventFieldsFragment): PostDeletedActivity {
  return {
    eventType: fields.__typename,
    ...asBaseActivity(fields),
    actor: fields.actor,
    numberOfPosts: fields.posts.length,
    threadId: fields.posts[0].thread.id,
    threadTitle: fields.posts[0].thread.title,
  }
}

export function asCategoryCreatedActivity(fields: CategoryCreatedEventFieldsFragment): CategoryCreatedActivity {
  return {
    eventType: fields.__typename,
    ...asBaseActivity(fields),
    category: {
      id: fields.category.id,
      title: fields.category.title,
    },
    parentCategory: fields.category.parent ? fields.category.parent : undefined,
  }
}

export function asCategoryDeletedActivity(fields: CategoryDeletedEventFieldsFragment): CategoryDeletedActivity {
  return {
    eventType: fields.__typename,
    ...asBaseActivity(fields),
    category: {
      id: fields.category.id,
      title: fields.category.title,
    },
    parentCategory: fields.category.parent ? fields.category.parent : undefined,
  }
}

type EventsQueryResult = GetForumEventsQuery['events'][number]
type ForumEventsQueryResultTypes =
  | 'PostAddedEvent'
  | 'PostTextUpdatedEvent'
  | 'PostModeratedEvent'
  | 'PostDeletedEvent'
  | 'ThreadCreatedEvent'
  | 'ThreadDeletedEvent'
  | 'ThreadModeratedEvent'
  | 'CategoryCreatedEvent'
  | 'CategoryDeletedEvent'
type ForumEventsQueryResult = NarrowQueryResult<EventsQueryResult, ForumEventsQueryResultTypes>

const activityCastByType: Record<ForumEventsQueryResultTypes, (fields: any) => ForumActivity> = {
  PostAddedEvent: asPostActivity,
  PostTextUpdatedEvent: asPostActivity,
  PostModeratedEvent: asPostModeratedActivity,
  PostDeletedEvent: asPostDeletedActivity,
  ThreadCreatedEvent: asThreadCreatedActivity,
  ThreadDeletedEvent: asThreadDeletedActivity,
  ThreadModeratedEvent: asThreadModeratedActivity,
  CategoryCreatedEvent: asCategoryCreatedActivity,
  CategoryDeletedEvent: asCategoryDeletedActivity,
}

export const asForumActivities = (events: EventsQueryResult[]) =>
  events
    .filter((fields): fields is ForumEventsQueryResult => fields.__typename in activityCastByType)
    .map((eventFields) => activityCastByType[eventFields.__typename](eventFields))
