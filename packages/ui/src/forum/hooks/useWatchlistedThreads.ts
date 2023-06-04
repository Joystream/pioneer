import { ForumThreadOrderByInput } from '@/common/api/queries'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useGetForumThreadsQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumThread, ForumThread } from '@/forum/types'

import { FORUM_WATCHLIST } from '../constant'

interface UseWatchlistedThreads {
  isLoading: boolean
  threads: ForumThread[]
}

export const useWatchlistedThreads = (): UseWatchlistedThreads => {
  const [watchlist] = useLocalStorage<string[]>(FORUM_WATCHLIST)

  const status_json = {
    isTypeOf_not: 'ThreadStatusModerated',
  }
  const variables = {
    where: { id_in: watchlist ?? [], status_json },
    orderBy: [ForumThreadOrderByInput.IsStickyDesc, ForumThreadOrderByInput.UpdatedAtDesc],
  }
  const { loading, data: threadsData } = useGetForumThreadsQuery({ variables, skip: (watchlist ?? []).length === 0 })

  return {
    isLoading: loading,
    threads: threadsData && threadsData.forumThreads ? threadsData.forumThreads.map(asForumThread) : [],
  }
}
