import faker from 'faker'

import { RawForumCategoryMock, RawForumPostMock, RawForumThreadMock } from '@/mocks/data/seedForum'

import { randomFromRange, randomMember } from '../utils'

let nextThreadId = 0
let nextPostId = 0

export const generateForumPost = (threadId: string, authorId: string): RawForumPostMock => ({
  id: String(nextPostId++),
  threadId,
  authorId,
  text: faker.lorem.words(randomFromRange(10, 100)),
})

export const generateForumThreads = (
  forumCategories: Pick<RawForumCategoryMock, 'id'>[]
): {
  forumThreads: RawForumThreadMock[]
  forumPosts: RawForumPostMock[]
} => {
  const forumThreads = forumCategories
    .map(({ id }) => {
      return [...new Array(randomFromRange(3, 10))].map(() => ({
        id: String(nextThreadId++),
        categoryId: id,
        isSticky: faker.datatype.boolean(),
        title: faker.lorem.words(randomFromRange(4, 8)),
        authorId: randomMember().id,
        createdInEvent: {
          inBlock: 0,
        },
      }))
    })
    .flatMap((a) => a)

  const forumPosts = forumThreads
    .map(({ id, authorId }: RawForumThreadMock) => {
      const posts = [...new Array(randomFromRange(3, 10))].map(() => generateForumPost(id, randomMember().id))
      return [generateForumPost(id, authorId), ...posts]
    })
    .flatMap((a) => a)

  return { forumThreads, forumPosts }
}
