import { Reducer, useEffect, useMemo, useReducer } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { merge } from '@/common/utils'
import { ThreadEmptyFilters, ThreadFiltersState } from '@/forum/components/threads/ThreadFilters'
import { ThreadDefaultOrder, ThreadOrder } from '@/forum/components/threads/ThreadList'
import { useGetForumThreadsCountQuery, useGetForumThreadsQuery } from '@/forum/queries'
import { asForumThread } from '@/forum/types'

export interface ThreadsOptions {
  filters: ThreadFiltersState
  order: ThreadOrder
  categoryId?: string
  isArchive?: boolean
}

interface ThreadsNavigation {
  page: number
  perPage: number
}

const threadOptionReducer: Reducer<ThreadsOptions | Record<string, never>, Partial<ThreadsOptions>> = merge
const ThreadsDefaultOptions: ThreadsOptions = { filters: ThreadEmptyFilters, order: ThreadDefaultOrder }

export const useForumCategoryThreads = (options: Partial<ThreadsOptions>, pagination?: ThreadsNavigation) => {
  const initialOptions = useMemo(() => ({ ...ThreadsDefaultOptions, ...options }), [JSON.stringify(options)])
  useEffect(() => refresh(initialOptions), [initialOptions])

  const [{ order, filters, categoryId, isArchive }, refresh] = useReducer(threadOptionReducer, initialOptions)

  const { loading: loadingThreads, data: threadsData } = useGetForumThreadsQuery({
    variables: {
      where: where(filters, categoryId, isArchive),
      orderBy: [ForumThreadOrderByInput.IsStickyDesc, forumThreadOrderBy(order)],
      ...(!pagination
        ? { limit: 30 }
        : {
            limit: pagination.perPage,
            offset: (pagination.page - 1) * pagination.perPage,
          }),
    },
  })

  const { loading: loadingCount, data: countData } = useGetForumThreadsCountQuery({
    variables: { where: where(filters, categoryId, isArchive) },
  })
  const totalCount = countData?.forumThreadsConnection.totalCount

  return {
    isLoading: loadingThreads || loadingCount,
    threads: threadsData?.forumThreads.map((thread) => asForumThread(thread)) ?? [],
    threadCount: totalCount,
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
