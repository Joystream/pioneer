import { ForumThreadOrderByInput } from '@/common/api/queries'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useGetForumThreadsCountQuery, useGetForumThreadsQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumThread, ForumThread } from '@/forum/types'

import { FORUM_WATCHLIST } from '../constant'

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
  const [watchlist] = useLocalStorage<string[]>(FORUM_WATCHLIST)

  const status_json = {
    isTypeOf_not: 'ThreadStatusRemoved',
  }
  const variables = {
    where: { id_in: watchlist ?? [], status_json },
    limit: threadsPerPage,
    offset: (page - 1) * threadsPerPage,
    orderBy: [ForumThreadOrderByInput.IsStickyDesc, ForumThreadOrderByInput.UpdatedAtDesc],
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
