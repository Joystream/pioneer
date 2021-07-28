import { ForumThreadFieldsFragment } from '@/forum/queries/__generated__/forum.generated'

export interface ForumThread {
  id: string
  title: string
  isSticky: boolean
  categoryId: string
  postCount: number
}

export const asForumThread = (fields: ForumThreadFieldsFragment): ForumThread => ({
  id: fields.id,
  title: fields.title,
  isSticky: fields.isSticky,
  categoryId: fields.categoryId,
  postCount: 0,
})
