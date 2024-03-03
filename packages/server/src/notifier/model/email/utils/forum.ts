import { request } from 'graphql-request'

import { QUERY_NODE_ENDPOINT } from '@/common/config'
import { GetPostDocument, GetThreadDocument } from '@/common/queries'

interface ForumPost {
  author: string
  threadId: string
  thread: string
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
    }
  }

  return cachedForumPosts[id]
}

interface ForumThread {
  author: string
  title: string
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
    }
  }

  return cachedForumThreads[id]
}
