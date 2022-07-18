import { createType } from '@/common/model/createType'
import { postsToDeleteMap } from '@/forum/model/postsToDeleteMap'

describe('postsToDeleteMap', () => {
  it('Default', () => {
    const expected = { postId: 1, threadId: 2, categoryId: 3 }
    const postId = createType('PostId', expected.postId)
    const threadId = createType('ThreadId', expected.threadId)
    const categoryId = createType('CategoryId', expected.categoryId)

    const result = postsToDeleteMap(postId, threadId, categoryId)
    const [[extendedPostId, hide]] = result.entries()

    expect(extendedPostId.toJSON()).toEqual(expected)
    expect(hide.toJSON()).toBe(true)
  })
})
