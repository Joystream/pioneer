import { useMemo } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'

import { useGetForumThreadsQuery } from '../queries/__generated__/forum.generated'
import { asForumThread } from '../types'

export const useLatestForumThreads = (limit: number) => {
  const { data, loading } = useGetForumThreadsQuery({
    variables: {
      orderBy: ForumThreadOrderByInput.CreatedAtDesc, limit, where: {
        visibleThreadsCount_gte: 0,
        status_json:{
          isTypeOf_not: 'ThreadStatusModerated',
        },
      }
    },
  })
  const threads = useMemo(() => data?.forumThreads.map(asForumThread) ?? [], [data, loading])
  return { threads, isLoading: loading }
}
