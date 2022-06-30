import { useMemo } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'

import { useGetForumThreadsQuery } from '../queries/__generated__/forum.generated'
import { asForumThread } from '../types'

export const useLatestForumThreads = (limit: number) => {
  const status_json = {
    isTypeOf_not: 'ThreadStatusModerated',
    visiblePostsCount: { _gt: 0 },
  }
  const { data, loading } = useGetForumThreadsQuery({
    variables: { orderBy: ForumThreadOrderByInput.CreatedAtDesc, limit, where: { status_json } },
  })
  const threads = useMemo(() => data?.forumThreads.map(asForumThread) ?? [], [data, loading])
  return { threads, isLoading: loading }
}
