import request from 'graphql-request'

import { PIONEER_URL, QUERY_NODE_ENDPOINT } from '@/common/config'
import { GetPostDocument } from '@/common/queries'

import { BuildEmail } from '.'

export const emailFromForumPostNotification: BuildEmail = async ({ id, notificationType, entityId }, toEmail) => {
  if (!entityId) {
    throw Error(`Missing post id in notification ${notificationType}, with id: ${id}`)
  }

  const { author, threadId, thread, text } = await post(entityId)

  switch (notificationType) {
    case 'FORUM_THREAD_CONTIBUTOR':
    case 'FORUM_THREAD_CREATOR':
    case 'FORUM_WATCHED_THREAD':
      return toEmail(`New post in "${thread}" in Pioneer's forum`, {
        text: `${author} replied in the thread ${thread}.\nRead it here: ${PIONEER_URL}/#/forum/thread/${threadId}?post=${entityId}\n\nContent: ${text}`,
      })

    case 'FORUM_POST_MENTION':
      return toEmail("You were mentioned in Pioneer's forum", {
        text: `${author} mentioned you in the thread ${thread}.\nRead it here: ${PIONEER_URL}/#/forum/thread/${threadId}?post=${entityId}\n\nContent: ${text}`,
      })

    case 'FORUM_POST_REPLY':
      return toEmail("New reply in Pioneer's forum", {
        text: `${author} replied to you in the thread ${thread}.\nRead it here: ${PIONEER_URL}/#/forum/thread/${threadId}?post=${entityId}\n\nContent: ${text}`,
      })

    default:
      return toEmail("New post in Pioneer's forum", {
        text: `${author} posted in the thread ${thread}.\nRead it here: ${PIONEER_URL}/#/forum/thread/${threadId}?post=${entityId}\n\nContent: ${text}`,
      })
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
