import { asBaseActivity, asMemberDisplayFields } from '@/common/types'
import {
  CategoryCreatedEventFieldsFragment,
  PostAddedEventFieldsFragment,
  PostDeletedEventFieldsFragment,
  PostTextUpdatedEventFieldsFragment,
  ThreadCreatedEventFieldsFragment,
} from '@/forum/queries/__generated__/forumEvents.generated'

import { PostDeletedActivity } from '.'
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
    author: asMemberDisplayFields(fields.thread.author),
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
