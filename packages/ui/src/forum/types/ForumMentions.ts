import { ForumPostMentionFieldsFragment, ForumThreadMentionFieldsFragment } from '@/forum/queries'
import { asMember, Member } from '@/memberships/types'

export interface ForumThreadMention {
  id: string
  title: string
  visiblePostsCount: number
  author: Member
  text: string | undefined
}

export interface ForumPostMention {
  id: string
  text: string
  createdAt: string
  author: Member
}

export const asForumThreadMention = (fields: ForumThreadMentionFieldsFragment): ForumThreadMention => ({
  id: fields.id,
  title: fields.title,
  visiblePostsCount: fields.visiblePostsCount,
  author: asMember(fields.author),
  text: fields.initialPost?.text,
})

export const asForumPostMention = (fields: ForumPostMentionFieldsFragment): ForumPostMention => ({
  id: fields.id,
  text: fields.text,
  createdAt: fields.createdAt,
  author: asMember(fields.author),
})
