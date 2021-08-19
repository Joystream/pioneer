import faker from 'faker'

import { ThreadStatus } from '@/forum/types'
import { RawForumCategoryMock, RawForumPostMock, RawForumThreadMock } from '@/mocks/data/seedForum'

import { randomBlock, randomFromRange, randomFromWeightedSet, randomMember, repeat } from '../utils'

import { ActiveStatus as CategoryActiveStatus } from './generateCategories'

let nextThreadId = 0
let nextPostId = 0

export const generateForumPost = (threadId: string, authorId: string, repliesToId?: string): RawForumPostMock => {
  const createdAt = faker.date.recent(180)
  let lastEditDate: Date

  return {
    id: String(nextPostId++),
    threadId,
    authorId,
    text: faker.lorem.words(randomFromRange(10, 100)),
    repliesToId,
    edits: [...new Array(randomFromRange(0, 4))].map(() => {
      lastEditDate = faker.date.between(lastEditDate ?? createdAt, new Date())
      return {
        newText: faker.lorem.words(randomFromRange(10, 100)),
        ...randomBlock(lastEditDate),
      }
    }),
    postAddedEvent: randomBlock(createdAt),
  }
}

const Active: ThreadStatus = 'ThreadStatusActive'
const Locked: ThreadStatus = 'ThreadStatusLocked'
const Moderated: ThreadStatus = 'ThreadStatusModerated'
const Removed: ThreadStatus = 'ThreadStatusRemoved'
const ArchivedStatuses = [Locked, Moderated, Removed]
const randomThreadStatus = randomFromWeightedSet([12, Active], [1, Locked], [1, Moderated], [1, Removed])

export const generateForumThreads = (forumCategories: Pick<RawForumCategoryMock, 'id' | 'status'>[]) => {
  const forumThreads: RawForumThreadMock[] = forumCategories.flatMap((category) =>
    repeat(() => {
      const status =
        category.status === CategoryActiveStatus ? randomThreadStatus() : faker.random.arrayElement(ArchivedStatuses)

      const createdInEvent = randomBlock()
      return {
        id: String(nextThreadId++),
        createdAt: createdInEvent.createdAt,
        ...(Math.random() > 0.3 ? { updatedAt: faker.date.between(createdInEvent.createdAt, new Date()) } : {}),
        categoryId: category.id,
        isSticky: !(nextThreadId % 5),
        title: faker.lorem.words(randomFromRange(4, 8)),
        authorId: randomMember().id,
        status,
        createdInEvent,
      }
    }, randomFromRange(3, 10))
  )

  const forumPosts = forumThreads
    .map(({ id, authorId }: RawForumThreadMock) => {
      const posts: RawForumPostMock[] = []

      posts.push(generateForumPost(id, authorId))

      for (let i = 0; i < new Array(randomFromRange(3, 10)).length; i++) {
        const repliesToId =
          posts.length > 1 && Math.random() > 0.5 ? posts[randomFromRange(1, posts.length - 1)].id : undefined

        posts.push(generateForumPost(id, randomMember().id, repliesToId))
      }

      return posts
    })
    .flatMap((a) => a)

  return { forumThreads, forumPosts }
}
