import faker from 'faker'

import { RawForumCategoryMock, RawForumPostMock, RawForumThreadMock } from '@/mocks/data/seedForum'

import members from '../../../../src/mocks/data/raw/members.json'
import { randomFromRange } from '../utils'

const randomMember = () => members[randomFromRange(0, members.length - 1)]

export const generateForumThreads = (
  forumCategories: Pick<RawForumCategoryMock, 'id'>[]
): {
  forumThreads: RawForumThreadMock[]
  forumPosts: RawForumPostMock[]
} => {
  let nextId = 0

  const forumThreads = forumCategories
    .map(({ id }) => {
      return [...new Array(randomFromRange(3, 10))].map(() => ({
        id: String(nextId++),
        categoryId: id,
        isSticky: !(nextId % 5),
        title: faker.lorem.words(randomFromRange(4, 8)),
        authorId: randomMember().id,
        createdInEvent: {
          inBlock: 0,
        },
      }))
    })
    .flatMap((a) => a)

  nextId = 0

  const forumPosts = forumThreads.map(({ id, authorId }: RawForumThreadMock) => ({
    id: String(nextId++),
    threadId: id,
    authorId: authorId,
    text: faker.lorem.words(randomFromRange(10, 100)),
  }))

  return { forumThreads, forumPosts }
}
