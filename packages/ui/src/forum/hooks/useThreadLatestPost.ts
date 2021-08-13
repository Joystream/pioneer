import { ForumPostOrderByInput } from '@/common/api/queries'
import { useGetForumPostsQuery } from '@/forum/queries'
import { asForumPost } from '@/forum/types'

const orderBy = ForumPostOrderByInput.UpdatedAtDesc

export const useThreadLatestPost = (thread_eq: string) => {
  const { data } = useGetForumPostsQuery({ variables: { where: { thread_eq }, orderBy, limit: 1 } })
  const rawPost = data?.forumPosts[0]
  return { post: rawPost && asForumPost(rawPost) }
}
