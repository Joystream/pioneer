import { asBlock, Block } from '@/common/types'
import {
  ForumThreadDetailedFieldsFragment,
  ForumThreadFieldsFragment,
} from '@/forum/queries/__generated__/forum.generated'

export interface ForumThread {
  id: string
  title: string
  isSticky: boolean
  categoryId: string
}

export interface ForumThreadWithDetails extends ForumThread {
  createdInBlock: Block
}

export const asForumThread = (fields: ForumThreadFieldsFragment): ForumThread => ({
  id: fields.id,
  title: fields.title,
  isSticky: fields.isSticky,
  categoryId: fields.categoryId,
})

export const asForumThreadWithDetails = (fields: ForumThreadDetailedFieldsFragment): ForumThreadWithDetails => ({
  ...asForumThread(fields),
  createdInBlock: asBlock(fields.createdInEvent),
})
