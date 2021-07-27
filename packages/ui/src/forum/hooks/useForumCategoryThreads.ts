import { useGetForumThreadsQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumThread } from '@/forum/types'

export const useForumCategoryThreads = (categoryId: string) => {
  const { loading, data } = useGetForumThreadsQuery({ variables: { where: { category: { id_eq: categoryId } } } })

  return {
    isLoading: loading,
    threads: data?.forumThreads.map(asForumThread) ?? [],
  }
}
