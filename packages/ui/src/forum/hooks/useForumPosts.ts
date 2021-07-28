import { useGetForumPostsQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumPost } from '@/forum/types/ForumPost'

export const useForumPosts = (threadId: string) => {
  const { loading, data } = useGetForumPostsQuery({ variables: { where: { thread: { id_eq: threadId } } } })

  return {
    isLoading: loading,
    posts: data && data.forumPosts ? data.forumPosts.map(asForumPost) : [],
  }
}
