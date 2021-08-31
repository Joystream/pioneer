import { useMemo, useReducer } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { forumThreadOrderBy, threadOptionReducer, ThreadsDefaultOptions } from '@/forum/hooks/useForumCategoryThreads'
import { useGetForumThreadsCountQuery, useGetForumThreadsQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumThread, ForumThread } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

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

export const useMyThreads = ({ page, threadsPerPage = 5 }: UseMyThreadsProps): UseMyThreads => {
  const { members } = useMyMemberships()

  const [{ order }] = useReducer(threadOptionReducer, ThreadsDefaultOptions)
  const variables = {
    where: { author_in: members.map((m) => m.id) },
    limit: threadsPerPage,
    offset: (page - 1) * threadsPerPage,
    orderBy: [ForumThreadOrderByInput.IsStickyDesc, forumThreadOrderBy(order)],
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
