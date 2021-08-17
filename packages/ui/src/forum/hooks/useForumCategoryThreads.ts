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
}

const threadOptionReducer: Reducer<ThreadsOptions, Partial<ThreadsOptions>> = merge
const ThreadsDefaultOptions: ThreadsOptions = { filters: ThreadEmptyFilters, order: ThreadDefaultOrder }

export const useForumCategoryThreads = (options: Partial<ThreadsOptions>) => {
  const [{ order, filters, categoryId }, refresh] = useReducer(threadOptionReducer, {
    ...ThreadsDefaultOptions,
    ...options,
  })

  const { loading, data } = useGetPaginatedForumThreadsQuery({
    variables: {
      where: {
        ...(categoryId ? { category: { id_eq: categoryId } } : {}),
        ...where(filters),
      },
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

const where = ({ author, date }: ThreadFiltersState) => ({
  ...(author ? { author_eq: author?.id } : {}),
  ...(date && 'start' in date ? { createdAt_gte: date.start } : {}),
  ...(date && 'end' in date ? { createdAt_lte: date.end } : {}),
})

const orderBy = ({ key, isDescending }: ThreadOrder) =>
  ForumThreadOrderByInput[`${key}${isDescending ? 'Desc' : 'Asc'}` as const]
