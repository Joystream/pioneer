import { useGetForumPostsQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumPost, ForumPost, visiblePostStatuses } from '@/forum/types/ForumPost'

import { useForumThreadPostsCount } from './useForumThreadPostsCount'

export const POSTS_PER_PAGE = 5

interface UseForumPostsProps {
  threadId: string
  page?: number
}

interface UseForumThreadPosts {
  isLoading: boolean
  posts: ForumPost[]
  totalCount?: number
  pageCount?: number
}

export const useForumThreadPosts = ({ threadId, page = 1 }: UseForumPostsProps): UseForumThreadPosts => {
  const variables = {
    where: { thread: { id_eq: threadId }, status_json: { isTypeOf_in: visiblePostStatuses } },
    limit: POSTS_PER_PAGE,
    offset: (page - 1) * POSTS_PER_PAGE,
  }
  const { loadingCount, totalCount } = useForumThreadPostsCount(threadId)
  const { loading: loadingPosts, data: postsData } = useGetForumPostsQuery({ variables })

  return {
    isLoading: loadingPosts || loadingCount,
    posts: postsData && postsData.forumPosts ? postsData.forumPosts.map(asForumPost) : [],
    totalCount,
    pageCount: totalCount && Math.ceil(totalCount / POSTS_PER_PAGE),
  }
}
