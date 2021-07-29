import { PostReaction } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types/Block'
import { ForumPostFieldsFragment } from '@/forum/queries/__generated__/forum.generated'
import { Member } from '@/memberships/types'

export interface ForumPost {
  id: string
  link: string
  createdAt: string
  createdAtBlock: Block
  updatedAt?: string
  author?: Member
  authorId?: string
  text: string
  repliesTo?: ForumPost
  reaction?: PostReaction[]
}

export const asForumPost = (fields: ForumPostFieldsFragment): ForumPost => ({
  id: fields.id,
  text: fields.text,
  authorId: fields.authorId,
  createdAtBlock: asBlock(),
  link: '',
})
