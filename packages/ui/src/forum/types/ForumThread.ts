import { asBlock, Block } from '@/common/types'
import { ForumThreadDetailedFieldsFragment, ForumThreadFieldsFragment } from '@/forum/queries'

export interface ForumThread {
  id: string
  title: string
  authorId: string
  createdInBlock: Block
  isSticky: boolean
  categoryId: string
  tags: ForumThreadTag[]
  visiblePostsCount: number
  status: string
}

export interface ForumThreadTag {
  id: string
  title: string
  threads: ForumThread[]
  visibleThreadsCount: number
}

export interface ForumThreadWithDetails extends ForumThread {
  createdInBlock: Block
}

export const asForumThread = (fields: ForumThreadFieldsFragment): ForumThread => ({
  id: fields.id,
  title: fields.title,
  createdInBlock: asBlock(fields.createdInEvent),
  authorId: fields.authorId,
  isSticky: fields.isSticky,
  categoryId: fields.categoryId,
  tags: [],
  visiblePostsCount: 10,
  status: fields.status.__typename,
})

export const asForumThreadWithDetails = (fields: ForumThreadDetailedFieldsFragment): ForumThreadWithDetails => ({
  ...asForumThread(fields),
})
