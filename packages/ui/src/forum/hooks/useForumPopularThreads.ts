import { ForumThreadOrderByInput } from '@/common/api/queries'
import { useGetForumThreadsQuery } from '@/forum/queries'
import { asForumThread } from '@/forum/types'

const { VisiblePostsCountDesc, UpdatedAtDesc } = ForumThreadOrderByInput

interface Props {
  categoryId?: string
  page?: number
  threadsPerPage?: number
}

export const useForumPopularThreads = ({ categoryId, page = 1, threadsPerPage = 1 }: Props) => {
  const { data, loading } = useGetForumThreadsQuery({
    variables: {
      where: {
        ...(categoryId ? { category: { id_eq: categoryId } } : {}),
        status_json: { isTypeOf_eq: 'ThreadStatusActive' },
      },
      orderBy: [VisiblePostsCountDesc, UpdatedAtDesc],
      offset: (page - 1) * threadsPerPage,
      limit: threadsPerPage,
    },
  })

  return {
    isLoading: loading,
    threads: data?.forumThreads.map(asForumThread),
  }
}
