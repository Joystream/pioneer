import { createType } from '@joystream/types'
import { PostId, ThreadId } from '@joystream/types/common'
import { CategoryId } from '@joystream/types/forum'

import { postsToDeleteMap } from '@/forum/model/postsToDeleteMap'

describe('postsToDeleteMap', () => {
  it('Default', () => {
    const expected = { post_id: 1, thread_id: 2, category_id: 3 }
    const postId = createType<PostId, 'PostId'>('PostId', expected.post_id)
    const threadId = createType<ThreadId, 'ThreadId'>('ThreadId', expected.thread_id)
    const categoryId = createType<CategoryId, 'CategoryId'>('CategoryId', expected.category_id)

    const result = postsToDeleteMap(postId, threadId, categoryId)
    const [[extendedPostId, hide]] = result.entries()

    expect(extendedPostId.toJSON()).toEqual(expected)
    expect(hide.toJSON()).toBe(true)
  })
})
