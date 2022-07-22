import { useMemo } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { useGetForumThreadsQuery } from '@/forum/queries'

import { asForumThread } from '../types'

export const useLatestForumThreads = (limit: number) => {
  const { data, loading } = useGetForumThreadsQuery({
    variables: {
      orderBy: ForumThreadOrderByInput.CreatedAtDesc,
      limit,
      where: {
        visiblePostsCount_gt: 0,
        status_json: {
          isTypeOf_not: 'ThreadStatusModerated',
        },
      },
    },
  })
  const threads = useMemo(() => data?.forumThreads.map(asForumThread) ?? [], [data, loading])
  return { threads, isLoading: loading }
}
