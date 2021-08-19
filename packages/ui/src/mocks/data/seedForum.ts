import { BlockFieldsMock } from '@/mocks/data/common'

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
  status: string
}

export interface RawForumThreadMock {
  id: string
  categoryId: string
  isSticky: boolean
  title: string
  createdInEvent: BlockFieldsMock
  authorId: string
  status: { type: string; threadDeletedEvent?: BlockFieldsMock; threadModeratedEvent?: BlockFieldsMock }
}

interface PostEdit extends BlockFieldsMock {
  newText: string
}

export interface RawForumPostMock {
  id: string
  threadId: string
  authorId: string
  text: string
  repliesToId?: string
  edits: PostEdit[]
  postAddedEvent: BlockFieldsMock
}

const seedCategoryStatus = (statusText: string, server: any) => server.schema.create(statusText)

export function seedForumCategory(forumCategoryData: RawForumCategoryMock, server: any) {
  return server.schema.create('ForumCategory', {
    ...forumCategoryData,
    status: seedCategoryStatus(forumCategoryData.status, server),
  })
}

export const seedForumCategories = (server: any) => {
  categoriesData.map((forumCategoryData) => seedForumCategory(forumCategoryData, server))
}

const seedThreadCreatedInEvent = (event: { inBlock: number }, server: any) =>
  server.schema.create('ThreadCreatedEvent', event)

const seedThreadStatus = ({ type, ...data }: RawForumThreadMock['status'], server: any) =>
  server.schema.create(type, data)

export function seedForumThread(data: RawForumThreadMock, server: any) {
  return server.schema.create('ForumThread', {
    ...data,
    createdInEvent: seedThreadCreatedInEvent(data.createdInEvent, server),
    status: seedThreadStatus(data.status, server),
  })
}

export const seedForumThreads = (server: any) => {
  threadsData.map((data) => seedForumThread(data, server))
}

export function seedForumPost(data: RawForumPostMock, server: any) {
  const sortedEdits = data.edits.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return server.schema.create('ForumPost', {
    ...data,
    edits: data.edits.map((data) => server.schema.create('PostTextUpdatedEvent', data)),
    postaddedeventpost: [server.schema.create('PostAddedEvent', data.postAddedEvent)],
    createdAt: data.postAddedEvent.createdAt,
    updatedAt: sortedEdits.length ? sortedEdits[0].createdAt : null,
  })
}

export const seedForumPosts = (server: any) => {
  postsData.map((data) => seedForumPost(data, server))
}
