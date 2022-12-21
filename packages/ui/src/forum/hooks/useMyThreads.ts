import { ForumThreadOrderByInput } from '@/common/api/queries'
import { SortOrder, toQueryOrderByInput } from '@/common/hooks/useSort'
import { whenDefined } from '@/common/utils'
import { useGetForumThreadsCountQuery, useGetForumThreadsQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumThread, ForumThread } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface UseMyThreadsProps {
  page: number
  threadsPerPage?: number
  order: SortOrder<ForumThreadOrderByInput>
}

interface UseMyThreads {
  isLoading: boolean
  threads: ForumThread[]
  totalCount?: number
  pageCount?: number
}

export const useMyThreads = ({ page, threadsPerPage = 5, order }: UseMyThreadsProps): UseMyThreads => {
  const { members, active } = useMyMemberships()

  const status_json = {
    isTypeOf_not: 'ThreadStatusModerated',
  }
  const variables = {
    where: {
      author: { id_in: whenDefined(active?.id, (id) => [id]) ?? members.map((m) => m.id) },
      status_json,
    },
    limit: threadsPerPage,
    offset: (page - 1) * threadsPerPage,
    orderBy: [ForumThreadOrderByInput.IsStickyDesc, toQueryOrderByInput<ForumThreadOrderByInput>(order)],
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
