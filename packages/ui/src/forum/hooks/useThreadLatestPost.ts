import { useMemo } from 'react'

import { ForumPostOrderByInput, ForumPostWhereInput } from '@/common/api/queries'
import { useGetForumPostsQuery } from '@/forum/queries'
import { asForumPost } from '@/forum/types'

const orderBy = [ForumPostOrderByInput.UpdatedAtDesc]

export const useThreadLatestPost = (threadId: string) => {
  const where = useMemo((): ForumPostWhereInput => ({ thread: { id_eq: threadId }, isVisible_eq: true }), [threadId])
  const { data } = useGetForumPostsQuery({ variables: { where, orderBy, limit: 1 } })
  const rawPost = data?.forumPosts[0]
  return { post: rawPost && asForumPost(rawPost) }
}
