import { useGetForumThreadQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumThreadWithDetails } from '@/forum/types'

export const useForumThread = (threadId: string) => {
  const { loading, data, error } = useGetForumThreadQuery({ variables: { where: { id: threadId } } })

  return {
    isLoading: loading,
    thread: data && data.thread ? asForumThreadWithDetails(data.thread) : null,
    hasError: !!error,
  }
}
