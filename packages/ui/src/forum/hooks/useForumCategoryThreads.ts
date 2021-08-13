import { ForumThreadOrderByInput } from '@/common/api/queries'
import { ThreadEmptyFilters, ThreadFiltersState } from '@/forum/components/threads/ThreadFilters'
import { ThreadDefaultOrder, ThreadOrder } from '@/forum/components/threads/ThreadList'
import { useGetPaginatedForumThreadsQuery } from '@/forum/queries'
import { asForumThread } from '@/forum/types'

export interface ThreadsOptions {
  filters: ThreadFiltersState
  order: ThreadOrder
}
export const ThreadsDefaultOptions: ThreadsOptions = { filters: ThreadEmptyFilters, order: ThreadDefaultOrder }

export const useForumCategoryThreads = (categoryId: string, { order, filters }: ThreadsOptions) => {
  const { loading, data } = useGetPaginatedForumThreadsQuery({
    variables: {
      where: { category: { id_eq: categoryId }, ...where(filters) },
      orderBy: [ForumThreadOrderByInput.IsStickyAsc, orderBy(order)],
      first: 30,
    },
  })

  const connection = data?.forumThreadsConnection

  return {
    isLoading: loading,
    threads: connection?.edges.map(({ node }) => asForumThread(node)) ?? [],
    threadCount: connection?.totalCount,
  }
}

const where = ({ author, date }: ThreadFiltersState) => ({
  author_eq: author?.id,
  ...(date && 'start' in date ? { createdAt_gte: date.start } : {}),
  ...(date && 'end' in date ? { createdAt_lte: date.end } : {}),
})

const orderBy = ({ key, isDescending }: ThreadOrder) =>
  ForumThreadOrderByInput[`${key}${isDescending ? 'Desc' : 'Asc'}` as const]
