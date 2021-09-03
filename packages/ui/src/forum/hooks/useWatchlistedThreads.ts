import { useMemo } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { ThreadDefaultOrder } from '@/forum/components/threads/ThreadList'
import { forumThreadOrderBy } from '@/forum/hooks/useForumCategoryThreads'
import { useGetForumThreadsCountQuery, useGetForumThreadsQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumThread, ForumThread } from '@/forum/types'

interface UseMyThreadsProps {
  page: number
  threadsPerPage?: number
}

interface UseMyThreads {
  isLoading: boolean
  threads: ForumThread[]
  totalCount?: number
  pageCount?: number
}

export const useWatchlistedThreads = ({ page, threadsPerPage = 5 }: UseMyThreadsProps): UseMyThreads => {
  const [watchlist] = useLocalStorage('forum-watchlist')
  const threadIds: string[] = useMemo(() => (watchlist ? JSON.parse(watchlist) : []), [watchlist])

  const variables = {
    where: { id_in: threadIds },
    limit: threadsPerPage,
    offset: (page - 1) * threadsPerPage,
    orderBy: [ForumThreadOrderByInput.IsStickyDesc, forumThreadOrderBy(ThreadDefaultOrder)],
  }
  const { loading: loadingPosts, data: threadsData } = useGetForumThreadsQuery({ variables })
  const { loading: loadingCount, data: countData } = useGetForumThreadsCountQuery({
    variables: { where: variables.where },
  })

  const totalCount = countData?.forumThreadsConnection.totalCount

  return {
    isLoading: loadingPosts || loadingCount,
    threads: threadsData && threadsData.forumThreads ? threadsData.forumThreads.map(asForumThread) : [],
    totalCount,
    pageCount: totalCount && Math.ceil(totalCount / threadsPerPage),
  }
}
