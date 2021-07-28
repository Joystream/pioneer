import { useGetForumThreadQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumThread } from '@/forum/types'

export const useForumThread = (threadId: string) => {
  const { loading, data } = useGetForumThreadQuery({ variables: { where: { id: threadId } } })

  return {
    isLoading: loading,
    thread: data && data.thread ? asForumThread(data.thread) : null,
  }
}
