import rawForumCategories from './raw/forumCategories.json'
import rawForumThreads from './raw/forumThreads.json'

export const categoriesData = rawForumCategories.map((rawForumCategory) => ({ ...rawForumCategory }))
export const threadsData = rawForumThreads.map((rawForumThread) => ({ ...rawForumThread }))

export interface RawForumCategoryMock {
  id: string
  title: string
  description: string
}

export interface RawForumThreadMock {
  id: string
  categoryId: string
  isSticky: boolean
  title: string
  createdInEvent: { inBlock: number }
}

export function seedForumCategory(forumCategoryData: RawForumCategoryMock, server: any) {
  return server.schema.create('ForumCategory', {
    ...forumCategoryData,
  })
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
