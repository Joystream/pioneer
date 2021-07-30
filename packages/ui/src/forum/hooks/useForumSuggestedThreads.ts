import { useMemo } from 'react'

import { useGetForumThreadsIDsQuery, useGetForumThreadsQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumThread } from '@/forum/types'

const MAX_SUGGESTED_THREADS = 5

export const useForumSuggestedThreads = () => {
  const { loading: loadingIDs, data: threadIDsData } = useGetForumThreadsIDsQuery()

  const randomIDs = useMemo(() => {
    return (threadIDsData?.forumThreads ?? [])
      .map((thread) => thread.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, MAX_SUGGESTED_THREADS)
  }, [loadingIDs, JSON.stringify(threadIDsData)])

  const { loading, data: threadsData } = useGetForumThreadsQuery({
    variables: { where: { id_in: randomIDs } },
  })

  return {
    isLoading: loading,
    threads: threadsData?.forumThreads.map(asForumThread) ?? [],
  }
}
