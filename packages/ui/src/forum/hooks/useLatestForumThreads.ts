import { useMemo } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { ActiveStatus } from '@/forum/hooks/useForumCategories'
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
        category: {
          status_json: {
            isTypeOf_eq: ActiveStatus,
          },
        },
      },
    },
  })
  const threads = useMemo(() => data?.forumThreads.map(asForumThread) ?? [], [data, loading])
  return { threads, isLoading: loading }
}
