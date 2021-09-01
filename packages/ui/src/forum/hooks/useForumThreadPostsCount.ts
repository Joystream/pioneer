import { useGetForumPostsCountQuery } from '@/forum/queries/__generated__/forum.generated'
import { visiblePostStatuses } from '@/forum/types/ForumPost'

export const POSTS_PER_PAGE = 5

interface UseForumThreadPostsCount {
  loadingCount: boolean
  totalCount?: number
}

export const useForumThreadPostsCount = (threadId: string): UseForumThreadPostsCount => {
  const variables = {
    where: { thread: { id_eq: threadId }, status_json: { isTypeOf_in: visiblePostStatuses } },
  }
  const { loading: loadingCount, data: countData } = useGetForumPostsCountQuery({ variables })

  const totalCount = countData?.forumPostsConnection.totalCount

  return {
    loadingCount,
    totalCount,
  }
}
