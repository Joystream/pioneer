import { ForumPostFieldsFragment } from '@/forum/queries/__generated__/forum.generated'

import { PostReaction } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types/Block'
import { Member } from '@/memberships/types'

export interface ForumPost {
  id: string
  link: string
  createdAtBlock: Block
  updatedAt?: string
  author: Member
  text: string
  repliesTo?: ForumPost
  reaction?: PostReaction[]
}

export const asForumPost = (fields: ForumPostFieldsFragment): ForumPost => ({
  id: fields.id,
  text: fields.text,
  authorId: fields.authorId,
  createdAtBlock: asBlock()
})
