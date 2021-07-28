import { ForumCategoryFieldsFragment } from '@/forum/queries/__generated__/forum.generated'

export interface ForumCategory extends ForumSubCategory {
  description: string
  threadCount: number
  subcategories: ForumSubCategory[]
}

interface ForumSubCategory {
  id: string
  title: string
}

export const asForumCategory = (fields: ForumCategoryFieldsFragment): ForumCategory => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  threadCount: 0,
  subcategories: [],
})
