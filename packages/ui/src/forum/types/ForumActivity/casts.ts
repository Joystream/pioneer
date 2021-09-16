import { asBaseActivity } from '@/common/types'
import {
  PostAddedEventFieldsFragment,
  PostTextUpdatedEventFieldsFragment,
  ThreadCreatedEventFieldsFragment,
} from '@/forum/queries/__generated__/forumEvents.generated'

import { PostAddedActivity, PostEditedActivity, ThreadCreatedActivity } from './types'

export function asPostActivity(
  fields: PostAddedEventFieldsFragment | PostTextUpdatedEventFieldsFragment
): PostAddedActivity | PostEditedActivity {
  return {
    eventType: fields.__typename,
    id: fields.id,
    createdAt: fields.createdAt,
    postId: fields.post.id,
    threadId: fields.post.thread.id,
    author: {
      id: fields.post.author.id,
      handle: fields.post.author.handle,
    },
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
    author: fields.thread.author,
  }
}
