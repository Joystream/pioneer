import { Reducer, useReducer } from 'react'

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
  const [{ order, filters, categoryId, isArchive }, refresh] = useReducer(threadOptionReducer, {
    ...ThreadsDefaultOptions,
    ...options,
  })

  const { loading, data } = useGetPaginatedForumThreadsQuery({
    variables: {
      where: where(filters, categoryId, isArchive),
      orderBy: [ForumThreadOrderByInput.IsStickyDesc, orderBy(order)],
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
  const dateFilter = date && {
    ...(date && 'start' in date ? { createdAt_gte: date.start } : {}),
    ...(date && 'end' in date ? { createdAt_lte: date.end } : {}),
  }
  return {
    ...(categoryId ? { category: { id_eq: categoryId } } : {}),
    ...(author ? { author_eq: author?.id } : {}),
    ...(isArchive
      ? {
          OR: [
            {
              status_json: { isTypeOf_in: ['ThreadStatusLocked', 'ThreadStatusRemoved'] },
              ...(date ? { threaddeletedeventthread_some: dateFilter } : {}),
            },
            {
              status_json: { isTypeOf_eq: 'ThreadStatusModerated' },
              ...(date ? { threadmoderatedeventthread_some: dateFilter } : {}),
            },
          ],
        }
      : { status_json: { isTypeOf_eq: 'ThreadStatusActive' }, ...dateFilter }),
  }
}

const orderBy = ({ key, isDescending }: ThreadOrder) =>
  ForumThreadOrderByInput[`${key}${isDescending ? 'Desc' : 'Asc'}` as const]
