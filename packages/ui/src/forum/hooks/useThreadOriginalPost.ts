import { ForumPostOrderByInput } from '@/common/api/queries'

import { useGetForumPostsQuery } from '../queries'
import { asForumPost } from '../types'

export const useThreadOriginalPost = (threadId: string) => {
  const { data, loading } = useGetForumPostsQuery({
    variables: {
      where: { thread: { id_eq: threadId } },
      orderBy: ForumPostOrderByInput.DeletedAtAsc,
      limit: 1,
    },
  })
  return {
    originalPost: data?.forumPosts[0] && asForumPost(data.forumPosts[0]),
    isLoading: loading,
  }
}
