import { useMemo } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'

import { useGetForumThreadsQuery } from '../queries/__generated__/forum.generated'
import { asForumThread } from '../types'

export const useTopForumThreads = (limit: number) => {
  const { data, loading } = useGetForumThreadsQuery({
    variables: { orderBy: ForumThreadOrderByInput.VisiblePostsCountDesc, limit },
  })
  const threads = useMemo(() => data?.forumThreads.map(asForumThread) ?? [], [data, loading])
  return { threads, isLoading: loading }
}
