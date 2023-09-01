import { Reducer, useEffect, useMemo, useReducer } from 'react'

import { ForumThreadOrderByInput } from '@/common/api/queries'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { merge } from '@/common/utils'
import { ThreadEmptyFilters, ThreadFiltersState } from '@/forum/components/threads/ThreadFilters'
import { useGetForumThreadsCountQuery, useGetForumThreadsQuery } from '@/forum/queries'
import { asForumThread } from '@/forum/types'

export interface ThreadsOptions {
  filters: ThreadFiltersState
  order?: SortOrder<ForumThreadOrderByInput>
  categoryId?: string
  isArchive?: boolean
}

interface ThreadsNavigation {
  page: number
  perPage: number
}

const threadOptionReducer: Reducer<ThreadsOptions | Record<string, never>, Partial<ThreadsOptions>> = merge
const ThreadsDefaultOptions: ThreadsOptions = { filters: ThreadEmptyFilters }

export const useForumCategoryThreads = (
  options: Partial<ThreadsOptions> & { order: SortOrder<ForumThreadOrderByInput> },
  pagination?: ThreadsNavigation
) => {
  const initialOptions = useMemo(() => ({ ...ThreadsDefaultOptions, ...options }), [JSON.stringify(options)])
  useEffect(() => refresh(initialOptions), [initialOptions])

  const [{ filters, categoryId, isArchive }, refresh] = useReducer(threadOptionReducer, initialOptions)

  const { data: threadsData } = useGetForumThreadsQuery({
    variables: {
      where: where(filters, categoryId, isArchive),
      orderBy: [ForumThreadOrderByInput.IsStickyDesc, toQueryOrderByInput<ForumThreadOrderByInput>(options.order)],
      ...(!pagination
        ? { limit: 30 }
        : {
            limit: pagination.perPage,
            offset: (pagination.page - 1) * pagination.perPage,
          }),
    },
    pollInterval: isArchive === false ? MILLISECONDS_PER_BLOCK : 0,
  })

  const { data: countData } = useGetForumThreadsCountQuery({
    variables: { where: where(filters, categoryId, isArchive) },
    pollInterval: isArchive === false ? MILLISECONDS_PER_BLOCK : 0,
  })
  const totalCount = countData?.forumThreadsConnection.totalCount

  return {
    isLoading: !threadsData || !countData,
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
    ...(author ? { author: { id_eq: author?.id } } : {}),
    ...(date && !isArchive ? dateFilter : {}),
    status_json: {
      isTypeOf_eq: isArchive ? 'ThreadStatusLocked' : 'ThreadStatusActive',
      ...(date && isArchive ? { threadDeletedEvent: dateFilter } : {}),
    },
  }
}
