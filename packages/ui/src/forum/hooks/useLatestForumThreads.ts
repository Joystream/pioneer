import { useMemo } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { useGetForumThreadsQuery } from '@/forum/queries'

import { asForumThread } from '../types'

export const useLatestForumThreads = () => {
  const { data, loading } = useGetForumThreadsQuery({
    variables: {
      orderBy: ForumThreadOrderByInput.CreatedAtDesc,
      limit: 50,
      where: {
        visiblePostsCount_gt: 0,
        status_json: {
          isTypeOf_eq: 'ThreadStatusActive',
        },
      },
    },
  })
  const threads = useMemo(() => data?.forumThreads.map(asForumThread) ?? [], [data, loading])
  return { threads, isLoading: loading }
}
