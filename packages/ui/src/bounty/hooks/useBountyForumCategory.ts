import { ForumCategoryOrderByInput } from '@/common/api/queries'
import { ActiveStatus } from '@/forum/hooks/useForumCategories'
import { useGetForumCategoriesQuery } from '@/forum/queries'
import { asForumCategory } from '@/forum/types'

export const useBountyForumCategory = () => {
  const { loading, data } = useGetForumCategoriesQuery({
    variables: {
      where: {
        parent: { id_eq: null },
        status_json: { isTypeOf_eq: ActiveStatus },
      },
      orderBy: ForumCategoryOrderByInput.CreatedAtAsc,
      limit: 1,
    },
  })

  return {
    isLoading: loading,
    threadCategory: data?.forumCategories.map(asForumCategory)?.[0],
  }
}
