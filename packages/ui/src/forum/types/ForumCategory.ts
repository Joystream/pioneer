import { ForumCategoryFieldsFragment } from '@/forum/queries/__generated__/forum.generated'

export interface ForumCategory extends ForumSubCategory {
  description: string
  subcategories: ForumSubCategory[]
  moderators: ForumModerator[]
}

export interface ForumModerator {
  id: string
  membershipId: string
  handle?: string
  avatar?: string
}

interface ForumSubCategory {
  id: string
  title: string
}

export const asForumCategory = (fields: Omit<ForumCategoryFieldsFragment, '__typename'>): ForumCategory => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  subcategories: [],
  moderators: [],
})
