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
}

export interface RawForumThreadMock {
  id: string
  categoryId: string
  isSticky: boolean
  title: string
  createdInEvent: BlockFieldsMock
  authorId: string
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
  createdAt: string
}

export function seedForumCategory(forumCategoryData: RawForumCategoryMock, server: any) {
  const forumcategoryparentIds = categoryParentIds(forumCategoryData.parentId, server, [])

  return server.schema.create('ForumCategory', {
    ...forumCategoryData,
    ...(forumcategoryparentIds.length ? { forumcategoryparentIds } : {}),
  })
}

const categoryParentIds = (parentId: string | null | undefined, server: any, parentIds: string[]): string[] => {
  const parent = parentId && server.schema.find('ForumCategory', parentId)
  return parent ? categoryParentIds(parent.parentId, server, [parent.id, ...parentIds]) : parentIds
}

export const seedForumCategories = (server: any) => {
  categoriesData.map((forumCategoryData) => seedForumCategory(forumCategoryData, server))
}

const seedThreadCreatedInEvent = (event: { inBlock: number }, server: any) =>
  server.schema.create('ThreadCreatedEvent', event)

export function seedForumThread(data: RawForumThreadMock, server: any) {
  return server.schema.create('ForumThread', {
    ...data,
    createdInEvent: seedThreadCreatedInEvent(data.createdInEvent, server),
  })
}

export const seedForumThreads = (server: any) => {
  threadsData.map((data) => seedForumThread(data, server))
}

export function seedForumPost(data: RawForumPostMock, server: any) {
  const sortedEdits = data.edits.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  return server.schema.create('ForumPost', {
    ...data,
    edits: data.edits.map((data) => server.schema.create('PostTextUpdatedEvent', data)),
    updatedAt: sortedEdits.length ? sortedEdits[0].createdAt : null,
  })
}

export const seedForumPosts = (server: any) => {
  postsData.map((data) => seedForumPost(data, server))
}
