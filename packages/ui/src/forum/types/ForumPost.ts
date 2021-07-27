import { PostReaction } from '@/common/api/queries'
import { Block } from '@/common/types/Block'
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
