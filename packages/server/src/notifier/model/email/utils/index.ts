import { Prisma } from '@prisma/client'
import { request } from 'graphql-request'

import { QUERY_NODE_ENDPOINT } from '@/common/config'
import { GetPostDocument, GetThreadDocument } from '@/common/queries'
import { Email } from '@/common/utils/email'

export type Notification = Prisma.NotificationGetPayload<{ include: { member: true } }>
type NotificationWithEmailAddress = Notification & { member: { email: string } }

export type EmailFromNotificationFn = (notification: NotificationWithEmailAddress) => Promise<Email | void>

export const hasEmailAddress = (notification: Notification): notification is NotificationWithEmailAddress =>
  !!notification.member.email

interface ForumPost {
  author: string
  threadId: string
  thread: string
  text: string
}
const cachedForumPosts: { [id: string]: ForumPost } = {}
export const getForumPost = async (id: string): Promise<ForumPost> => {
  if (!(id in cachedForumPosts)) {
    const { forumPostByUniqueInput: post } = await request(QUERY_NODE_ENDPOINT, GetPostDocument, { id })
    if (!post) {
      throw Error(`Failed to fetch post ${id} on the QN`)
    }

    cachedForumPosts[id] = {
      author: post.author.handle,
      threadId: post.thread.id,
      thread: post.thread.title,
      text: post.text,
    }
  }

  return cachedForumPosts[id]
}

interface ForumThread {
  author: string
  title: string
  text?: string
}
const cachedForumThreads: { [id: string]: ForumThread } = {}
export const getForumThread = async (id: string): Promise<ForumThread> => {
  if (!(id in cachedForumThreads)) {
    const { forumThreadByUniqueInput: thread } = await request(QUERY_NODE_ENDPOINT, GetThreadDocument, { id })
    if (!thread) {
      throw Error(`Failed to fetch thread ${id} on the QN`)
    }

    cachedForumThreads[id] = {
      author: thread.author.handle,
      title: thread.title,
      text: thread.initialPost?.text,
    }
  }

  return cachedForumThreads[id]
}
