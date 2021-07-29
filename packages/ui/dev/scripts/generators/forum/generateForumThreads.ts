import faker from 'faker'

import { RawForumCategoryMock, RawForumPostMock, RawForumThreadMock } from '@/mocks/data/seedForum'

import { randomFromRange, randomMember } from '../utils'

let nextThreadId = 0
let nextPostId = 0

export const generateForumPost = (threadId: string, authorId: string, repliesToId?: string): RawForumPostMock => ({
  id: `${threadId}:${String(nextPostId++)}`,
  threadId,
  authorId,
  text: faker.lorem.words(randomFromRange(10, 100)),
  repliesToId,
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
        isSticky: !(nextThreadId % 5),
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
      nextPostId = 0
      const posts: RawForumPostMock[] = []

      posts.push(generateForumPost(id, authorId))

      for (const i of new Array(randomFromRange(3, 10))) {
        const repliesToId =
          posts.length > 1 && Math.random() > 0.5 ? posts[randomFromRange(1, posts.length - 1)].id : undefined

        posts.push(generateForumPost(id, randomMember().id, repliesToId))
      }

      return posts
    })
    .flatMap((a) => a)

  return { forumThreads, forumPosts }
}
