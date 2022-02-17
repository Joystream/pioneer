import { BlockFieldsMock } from '@/mocks/data/common'

import { seedOverridableEntities } from '../helpers/seedEntities'

import rawForumCategories from './raw/forumCategories.json'
import rawForumPosts from './raw/forumPosts.json'
import rawForumThreads from './raw/forumThreads.json'

export const categoriesData = rawForumCategories.map((rawForumCategory) => ({ ...rawForumCategory }))
export const threadsData = rawForumThreads.map((rawForumThread) => ({ ...rawForumThread }))
export const postsData = rawForumPosts.map((rawData) => ({ ...rawData }))

export interface RawForumCategoryMock {
  id: string
  title: string
  description: string
  parentId?: string | null
  moderatorIds: string[]
  status: { __typename: string; categoryArchivalStatusUpdatedEvent?: BlockFieldsMock }
}

export interface RawForumThreadMock {
  id: string
  categoryId: string
  isSticky: boolean
  title: string
  createdInEvent: BlockFieldsMock
  authorId: string
  status: { __typename: string; threadDeletedEvent?: BlockFieldsMock; threadModeratedEvent?: BlockFieldsMock }
  visiblePostsCount: number
}

interface PostEdit extends BlockFieldsMock {
  newText: string
}

interface PostAddedEventMock extends BlockFieldsMock {
  text: string
}

interface PostDeletedEventMock extends BlockFieldsMock {
  actorId: string
  rationale: string
}

interface PostModeratedEventMock extends BlockFieldsMock {
  actorId: string
}

export interface RawForumPostMock {
  id: string
  threadId: string
  authorId: string
  text: string
  repliesToId?: string
  edits: PostEdit[]
  postAddedEvent: PostAddedEventMock
  status: string
  deletedInEvent: PostDeletedEventMock | null
  postModeratedEvent: PostModeratedEventMock | null
}

const seedCategoryStatus = (status: RawForumCategoryMock['status'], server: any) => {
  const key = 'categoryArchivalStatusUpdatedEvent'
  const eventType = 'CategoryArchivalStatusUpdatedEvent'
  const event = status[key] && { [key]: server.schema.create(eventType, status[key]) }
  return server.schema.create(status.__typename, event ?? {})
}

export function seedForumCategory(forumCategoryData: RawForumCategoryMock, server: any) {
  return server.schema.create('ForumCategory', {
    ...forumCategoryData,
    status: seedCategoryStatus(forumCategoryData.status, server),
  })
}

export const seedForumCategories = seedOverridableEntities<RawForumCategoryMock>(categoriesData, seedForumCategory)

const seedThreadCreatedInEvent = (event: { inBlock: number }, server: any) =>
  server.schema.create('ThreadCreatedEvent', event)

const seedThreadStatus = ({ __typename, ...data }: RawForumThreadMock['status'], threadId: string, server: any) => {
  const { threadDeletedEvent } = data
  const isArchived = __typename === 'ThreadStatusLocked'
  const event = isArchived
    ? {
        threadDeletedEvent: server.schema.create('ThreadDeletedEvent', {
          ...threadDeletedEvent,
          threadId,
        }),
      }
    : {}
  return server.schema.create(__typename, event)
}

export async function seedForumThread(data: RawForumThreadMock, server: any) {
  const thread = server.schema.create('ForumThread', {
    ...data,
    createdInEvent: seedThreadCreatedInEvent(data.createdInEvent, server),
    status: null,
  })

  return thread.update({ status: seedThreadStatus(data.status, data.id, server) })
}

export const seedForumThreads = seedOverridableEntities<RawForumThreadMock>(threadsData, seedForumThread)

export function seedForumPost(data: RawForumPostMock, server: any) {
  const sortedEdits = data.edits.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return server.schema.create('ForumPost', {
    ...data,
    edits: data.edits.map((data) => server.schema.create('PostTextUpdatedEvent', data)),
    postaddedeventpost: [server.schema.create('PostAddedEvent', data.postAddedEvent)],
    createdAt: data.postAddedEvent.createdAt,
    updatedAt: sortedEdits.length ? sortedEdits[0].createdAt : null,
    status: server.schema.create(data.status),
    isVisible: ['PostStatusActive', 'PostStatusLocked'].includes(data.status),
    deletedInEvent: data.deletedInEvent ? server.schema.create('PostDeletedEvent', data.deletedInEvent) : null,
    postmoderatedeventpost: data.postModeratedEvent
      ? [server.schema.create('PostModeratedEvent', data.postModeratedEvent)]
      : [],
  })
}

export const seedForumPosts = seedOverridableEntities<RawForumPostMock>(postsData, seedForumPost)
