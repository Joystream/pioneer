import { PostReaction } from '@/common/api/queries'
import { Member } from '@/memberships/types'

import { Block } from './Block'

export interface ForumPost {
  id: string
  createdAtBlock: Block
  updatedAt?: string
  author: Member
  text: string
  repliesTo?: ForumPost
  reaction?: PostReaction[]
}
