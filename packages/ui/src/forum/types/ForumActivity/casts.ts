import {
  PostAddedEventFieldsFragment,
  PostTextUpdatedEventFieldsFragment,
} from '@/forum/queries/__generated__/forumEvents.generated'

import { PostAddedActivity, PostEditedActivity } from './types'

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
