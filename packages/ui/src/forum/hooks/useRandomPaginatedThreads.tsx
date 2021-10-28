import { useMemo } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import {
  useGetForumThreadsCountQuery,
  useGetForumThreadsIDsQuery,
  useGetForumThreadsQuery,
} from '@/forum/queries/__generated__/forum.generated'
import { asForumThread } from '@/forum/types'

interface Props {
  page: number
  threadsPerPage: number
  maxThreads?: number
}

export const useRandomPaginatedThreads = ({ page, threadsPerPage, maxThreads }: Props) => {
  const { loading: loadingIDs, data: threadIDsData } = useGetForumThreadsIDsQuery()

  const randomIDs = useMemo(() => {
    return (threadIDsData?.forumThreads ?? [])
      .map((thread) => thread.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.ceil(Math.random() * (maxThreads ?? 10)))
  }, [loadingIDs, JSON.stringify(threadIDsData), maxThreads])

  const variables = {
    where: { id_in: randomIDs },
    limit: threadsPerPage,
    offset: (page - 1) * threadsPerPage,
    orderBy: [ForumThreadOrderByInput.IsStickyDesc, ForumThreadOrderByInput.UpdatedAtDesc],
  }

  const { loading: loadingThreads, data: threadsData } = useGetForumThreadsQuery({ variables })
  const { loading: loadingCount, data: countData } = useGetForumThreadsCountQuery({
    variables: { where: variables.where },
  })

  const totalCount = countData?.forumThreadsConnection.totalCount

  return {
    isLoading: loadingCount || loadingThreads,
    threads: threadsData?.forumThreads.map(asForumThread) ?? [],
    totalCount,
    pageCount: totalCount && Math.ceil(totalCount / threadsPerPage),
  }
}
