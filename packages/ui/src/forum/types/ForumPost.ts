import { Network, PostReaction } from '@/common/api/queries'
import { PostStatus as PostStatusSchema } from '@/common/api/queries/__generated__/baseTypes.generated'
import { asBlock, Block } from '@/common/types/Block'
import { ForumPostFieldsFragment } from '@/forum/queries/__generated__/forum.generated'
import { asMember, Member } from '@/memberships/types'

export interface ForumPost {
  id: string
  createdAt: string
  createdAtBlock?: Block
  updatedAt?: string
  author: Member
  text: string
  repliesTo?: ForumPost
  reaction?: PostReaction[]
}

export const asForumPost = (fields: ForumPostFieldsFragment): ForumPost => ({
  id: fields.id,
  createdAt: fields.createdAt,
  updatedAt: fields.updatedAt,
  author: asMember(fields.author),
  text: fields.text,
  ...(fields.repliesTo ? { repliesTo: asForumPost(fields.repliesTo) } : {}),
  createdAtBlock:
    fields?.postaddedeventpost && fields.postaddedeventpost.length ? asBlock(fields.postaddedeventpost[0]) : undefined,
})

export interface PostEdit {
  newText: string
  network: Network
  createdAt: string
  inBlock: number
}

export type PostStatusTypename = PostStatusSchema['__typename']

export const visiblePostStatuses: PostStatusTypename[] = ['PostStatusActive', 'PostStatusLocked']
