import { useGetForumThreadsCountQuery } from '../queries/__generated__/forum.generated'

export const useThreadsCount = (createdAfter: string) => {
  const { data, loading } = useGetForumThreadsCountQuery({
    variables: { where: { createdAt_gt: createdAfter } },
  })
  return {
    threadsCount: data?.forumThreadsConnection.totalCount,
    isLoading: loading,
  }
}
