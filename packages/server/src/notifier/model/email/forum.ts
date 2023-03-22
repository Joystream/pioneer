import request from 'graphql-request'

import { PIONEER_URL, QUERY_NODE_ENDPOINT } from '@/common/config'
import { GetPostDocument } from '@/common/queries'

import { EmailFromNotification, buildEmail } from './utils'

export const fromPostAddedNotification: EmailFromNotification = ({ id, kind, entityId, member }) => {
  if (!entityId) {
    throw Error(`Missing post id in notification ${kind}, with id: ${id}`)
  }

  const toEmail = buildEmail(member.email, () => post(entityId))

  switch (kind) {
    case 'FORUM_THREAD_CONTRIBUTOR':
    case 'FORUM_THREAD_CREATOR':
    case 'FORUM_WATCHED_THREAD':
    case 'FORUM_WATCHED_CATEGORY_POST':
      return toEmail(({ author, threadId, thread, text }) => ({
        subject: `New post in "${thread}" in Pioneer's forum`,
        text: `${author} replied in the thread ${thread}.\nRead it here: ${PIONEER_URL}/#/forum/thread/${threadId}?post=${entityId}\n\nContent: ${text}`,
      }))

    case 'FORUM_POST_MENTION':
      return toEmail(({ author, threadId, thread, text }) => ({
        subject: "You were mentioned in Pioneer's forum",
        text: `${author} mentioned you in the thread ${thread}.\nRead it here: ${PIONEER_URL}/#/forum/thread/${threadId}?post=${entityId}\n\nContent: ${text}`,
      }))

    case 'FORUM_POST_REPLY':
      return toEmail(({ author, threadId, thread, text }) => ({
        subject: "New reply in Pioneer's forum",
        text: `${author} replied to you in the thread ${thread}.\nRead it here: ${PIONEER_URL}/#/forum/thread/${threadId}?post=${entityId}\n\nContent: ${text}`,
      }))

    case 'FORUM_POST_ALL':
      return toEmail(({ author, threadId, thread, text }) => ({
        subject: "New post in Pioneer's forum",
        text: `${author} posted in the thread ${thread}.\nRead it here: ${PIONEER_URL}/#/forum/thread/${threadId}?post=${entityId}\n\nContent: ${text}`,
      }))
  }
}

interface Post {
  author: string
  threadId: string
  thread: string
  text: string
}
const posts: { [id: string]: Post } = {}
const post = async (id: string): Promise<Post> => {
  if (!(id in posts)) {
    const { forumPostByUniqueInput: post } = await request(QUERY_NODE_ENDPOINT, GetPostDocument, { id })
    if (!post) {
      throw Error(`Failed to fetch post ${id} on the QN`)
    }

    posts[id] = {
      author: post.author.handle,
      threadId: post.thread.id,
      thread: post.thread.title,
      text: post.text,
    }
  }

  return posts[id]
}
