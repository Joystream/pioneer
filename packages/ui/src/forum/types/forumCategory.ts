import { ForumCategoryFieldsFragment } from '@/forum/queries/__generated__/forum.generated'

export interface ForumCategory {
  id: string
  title: string
  description: string
}

export const asForumCategory = (fields: ForumCategoryFieldsFragment): ForumCategory => {
  return {
    id: fields.id,
    title: fields.title,
    description: fields.description,
  }
}
