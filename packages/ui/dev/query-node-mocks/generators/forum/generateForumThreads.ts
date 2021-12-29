import faker from 'faker'

import { PostStatusTypename, ThreadStatusType } from '@/forum/types'
import { RawForumCategoryMock, RawForumPostMock, RawForumThreadMock } from '@/mocks/data/seedForum'

import { randomBlock, randomFromRange, randomFromWeightedSet, randomMember, repeat } from '../utils'

import { ArchiveStatus as CategoryArchiveStatus } from './generateCategories'
import { MocksForForum } from './generateForumMocks'

let nextThreadId = 0
let nextPostId = 0

const randomPostStatus = randomFromWeightedSet<PostStatusTypename>(
  [10, 'PostStatusActive'],
  [1, 'PostStatusModerated'],
  [1, 'PostStatusRemoved']
)

export const generateForumPost = (
  mocks: MocksForForum,
  threadId: string,
  threadStatus: string,
  authorId: string,
  repliesToId?: string
) => {
  const createdAt = faker.date.recent(180)
  let lastEditDate: Date
  const postText = faker.lorem.words(randomFromRange(10, 100))
  const edits = [...new Array(randomFromRange(0, 4))].map(() => {
    lastEditDate = faker.date.between(lastEditDate ?? createdAt, new Date())
    return {
      newText: faker.lorem.words(randomFromRange(10, 100)),
      ...randomBlock(lastEditDate),
    }
  })
  const status: PostStatusTypename = threadStatus == 'ThreadStatusLocked' ? 'PostStatusLocked' : randomPostStatus()

  return {
    id: String(nextPostId++),
    threadId,
    authorId,
    edits,
    text: postText,
    repliesToId,
    postAddedEvent: {
      ...randomBlock(createdAt),
      text: edits.length ? faker.lorem.words(randomFromRange(10, 100)) : postText,
    },
    status,
    deletedInEvent:
      status === 'PostStatusRemoved'
        ? {
            ...randomBlock(),
            actorId: authorId,
            rationale: '',
          }
        : null,
    postModeratedEvent:
      status === 'PostStatusModerated'
        ? {
            ...randomBlock(),
            actorId: mocks.workers[randomFromRange(0, mocks.workers.length)]?.id as string,
          }
        : null,
  }
}

const Active: ThreadStatusType = 'ThreadStatusActive'
const Locked: ThreadStatusType = 'ThreadStatusLocked'
const Moderated: ThreadStatusType = 'ThreadStatusModerated'
const Removed: ThreadStatusType = 'ThreadStatusRemoved'
export const ForumThreadStatus = { Active, Locked, Moderated, Removed }

export const generateForumThreads =
  (forumCategories: Pick<RawForumCategoryMock, 'id' | 'status'>[]) => (mocks: MocksForForum) => {
    const forumThreads: RawForumThreadMock[] = forumCategories.flatMap((category) =>
      repeat(() => {
        const isArchived = category.status.__typename === CategoryArchiveStatus || Math.random() < 0.2
        const status = generateThreadStatus(isArchived ? Locked : Active)
        const createdInEvent = randomBlock()
        return {
          id: String(nextThreadId++),
          createdAt: createdInEvent.createdAt,
          ...(Math.random() > 0.3 ? { updatedAt: faker.date.between(createdInEvent.createdAt, new Date()) } : {}),
          categoryId: category.id,
          isSticky: !(nextThreadId % 5),
          title: faker.lorem.words(randomFromRange(4, 8)),
          authorId: randomMember(mocks.members).id,
          status,
          visiblePostsCount: randomFromRange(3, 8),
          createdInEvent,
        }
      }, randomFromRange(3, 10))
    )

    const forumPosts = forumThreads.flatMap(({ id, authorId, status, visiblePostsCount }) => {
      const posts: RawForumPostMock[] = []
      const isArchivedThread = status.__typename === Locked

      posts.push(generateForumPost(mocks, id, status.__typename, authorId))

      for (let visibleIndex = 1; visibleIndex < visiblePostsCount - 1; ) {
        const repliesToId =
          posts.length > 1 && Math.random() > 0.5 ? posts[randomFromRange(1, posts.length - 1)].id : undefined

        const post = generateForumPost(mocks, id, status.__typename, randomMember(mocks.members).id, repliesToId)
        posts.push(post)

        if (isArchivedThread ? post.status === 'PostStatusLocked' : post.status === 'PostStatusActive') {
          visibleIndex++
        }
      }

      return posts
    })

    return { forumThreads, forumPosts }
  }

const generateThreadStatus = (__typename: ThreadStatusType): RawForumThreadMock['status'] => {
  switch (__typename) {
    case Locked:
    case Removed:
      return { __typename, threadDeletedEvent: randomBlock() }
    case Moderated:
      return { __typename, threadModeratedEvent: randomBlock() }
    case Active:
      return { __typename }
  }
}
