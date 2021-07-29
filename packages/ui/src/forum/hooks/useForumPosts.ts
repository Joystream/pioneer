import { useGetForumPostsCountQuery, useGetForumPostsQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumPost, ForumPost } from '@/forum/types/ForumPost'

export const POSTS_PER_PAGE = 5

interface UseForumPostsProps {
  threadId: string
  page?: number
}

interface UseForumPosts {
  isLoading: boolean
  posts: ForumPost[]
  totalCount?: number
  pageCount?: number
}

export const useForumPosts = ({ threadId, page = 1 }: UseForumPostsProps): UseForumPosts => {
  const variables = {
    where: { thread: { id_eq: threadId } },
    limit: POSTS_PER_PAGE,
    offset: (page - 1) * POSTS_PER_PAGE,
  }
  const { loading: loadingPosts, data: postsData } = useGetForumPostsQuery({ variables })
  const { loading: loadingCount, data: countData } = useGetForumPostsCountQuery({
    variables: { where: variables.where },
  })

  const totalCount = countData?.forumPostsConnection.totalCount

  return {
    isLoading: loadingPosts || loadingCount,
    posts: postsData && postsData.forumPosts ? postsData.forumPosts.map(asForumPost) : [],
    totalCount,
    pageCount: totalCount && Math.ceil(totalCount / POSTS_PER_PAGE),
  }
}
