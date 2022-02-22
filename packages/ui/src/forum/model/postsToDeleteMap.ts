import { createType, registry } from '@joystream/types'
import { PostId, ThreadId } from '@joystream/types/common'
import { CategoryId, PostsToDeleteMap } from '@joystream/types/forum'

export const postsToDeleteMap = (postId: PostId, threadId: ThreadId, categoryId: CategoryId) => {
  const extendedPostId = createType('ExtendedPostId', { post_id: postId, thread_id: threadId, category_id: categoryId })
  return new PostsToDeleteMap(registry, new Map([[extendedPostId, true]]))
}
