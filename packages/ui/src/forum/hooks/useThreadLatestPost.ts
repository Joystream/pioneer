import { ForumPostOrderByInput } from '@/common/api/queries'
import { useGetForumPostsQuery } from '@/forum/queries'
import { asForumPost, visiblePostStatuses } from '@/forum/types'

const orderBy = ForumPostOrderByInput.UpdatedAtDesc

export const useThreadLatestPost = (threadId: string) => {
  const { data } = useGetForumPostsQuery({
    variables: {
      where: { thread: { id_eq: threadId }, status_json: { isTypeOf_in: visiblePostStatuses } },
      orderBy,
      limit: 1,
    },
  })
  const rawPost = data?.forumPosts[0]
  return { post: rawPost && asForumPost(rawPost) }
}
