import { ForumThreadFieldsFragment } from '@/forum/queries/__generated__/forum.generated'

export interface ForumThread {
  id: string
  title: string
  isSticky: boolean
  categoryId: string
}

export const asForumThread = (fields: ForumThreadFieldsFragment): ForumThread => {
  return {
    id: fields.id,
    title: fields.title,
    isSticky: fields.isSticky,
    categoryId: fields.categoryId,
  }
}
