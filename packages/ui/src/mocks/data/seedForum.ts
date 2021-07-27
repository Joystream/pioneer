import rawForumCategories from './raw/forumCategories.json'

export const categoriesData = rawForumCategories.map((rawForumCategory) => ({ ...rawForumCategory }))

interface RawForumCategoryMock {
  id: string
  title: string
  description: string
}

export function seedForumCategory(forumCategoryData: RawForumCategoryMock, server: any) {
  return server.schema.create('ForumCategory', {
    ...forumCategoryData,
  })
}

export const seedForumCategories = (server: any) => {
  categoriesData.map((forumCategoryData) => seedForumCategory(forumCategoryData, server))
}
