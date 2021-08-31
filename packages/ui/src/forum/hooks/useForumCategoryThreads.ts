import { Reducer, useEffect, useMemo, useReducer } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { merge } from '@/common/utils'
import { ThreadEmptyFilters, ThreadFiltersState } from '@/forum/components/threads/ThreadFilters'
import { ThreadDefaultOrder, ThreadOrder } from '@/forum/components/threads/ThreadList'
import { useGetPaginatedForumThreadsQuery } from '@/forum/queries'
import { asForumThread } from '@/forum/types'

export interface ThreadsOptions {
  filters: ThreadFiltersState
  order: ThreadOrder
  categoryId?: string
  isArchive?: boolean
}

const threadOptionReducer: Reducer<ThreadsOptions | Record<string, never>, Partial<ThreadsOptions>> = merge
const ThreadsDefaultOptions: ThreadsOptions = { filters: ThreadEmptyFilters, order: ThreadDefaultOrder }

export const useForumCategoryThreads = (options: Partial<ThreadsOptions>) => {
  const initalOptions = useMemo(() => ({ ...ThreadsDefaultOptions, ...options }), [JSON.stringify(options)])
  useEffect(() => refresh(initalOptions), [initalOptions])

  const [{ order, filters, categoryId, isArchive }, refresh] = useReducer(threadOptionReducer, initalOptions)

  const { loading, data } = useGetPaginatedForumThreadsQuery({
    variables: {
      where: where(filters, categoryId, isArchive),
      orderBy: [ForumThreadOrderByInput.IsStickyDesc, forumThreadOrderBy(order)],
      first: 30,
    },
  })

  const connection = data?.forumThreadsConnection

  return {
    isLoading: loading,
    threads: connection?.edges.map(({ node }) => asForumThread(node)) ?? [],
    threadCount: connection?.totalCount,
    refresh,
  }
}

const where = ({ author, date }: ThreadFiltersState, categoryId?: string, isArchive?: boolean) => {
  const dateFilter = {
    ...(date && 'start' in date ? { createdAt_gte: date.start } : {}),
    ...(date && 'end' in date ? { createdAt_lte: date.end } : {}),
  }
  return {
    ...(categoryId ? { category: { id_eq: categoryId } } : {}),
    ...(author ? { author_eq: author?.id } : {}),
    ...(date && !isArchive ? dateFilter : {}),
    status_json: {
      isTypeOf_eq: isArchive ? 'ThreadStatusLocked' : 'ThreadStatusActive',
      ...(date && isArchive ? { threadDeletedEvent: dateFilter } : {}),
    },
  }
}

export const forumThreadOrderBy = ({ key, isDescending }: ThreadOrder) =>
  ForumThreadOrderByInput[`${key}${isDescending ? 'Desc' : 'Asc'}` as const]
