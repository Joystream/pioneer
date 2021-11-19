import { useGetArchivedForumCategoriesQuery } from '@/forum/queries'
import { asArchivedForumCategory, CategoryStatusType } from '@/forum/types'

export const ArchivedStatus: CategoryStatusType = 'CategoryStatusArchived'

export const useArchivedForumCategories = () => {
  const { loading, data } = useGetArchivedForumCategoriesQuery({
    variables: {
      where: {
        status_json: { isTypeOf_eq: ArchivedStatus },
      },
    },
  })

  return {
    isLoading: loading,
    forumCategories: data?.forumCategories.map(asArchivedForumCategory),
  }
}
