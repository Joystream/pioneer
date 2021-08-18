import { useGetForumCategoriesQuery } from '@/forum/queries'
import { asForumCategory, CategoryStatus } from '@/forum/types'

interface Props {
  isRoot?: boolean
  isArchived?: boolean
}

export const ActiveStatus: CategoryStatus = 'CategoryStatusActive'
export const ArchivedStatus: CategoryStatus = 'CategoryStatusArchived'

export const useForumCategories = ({ isRoot, isArchived }: Props = {}) => {
  const { loading, data } = useGetForumCategoriesQuery({
    variables: {
      where: {
        ...(isRoot ? { parent_eq: null } : {}),
        status_json: { isTypeOf_eq: isArchived ? ArchivedStatus : ActiveStatus },
      },
    },
  })

  return {
    isLoading: loading,
    forumCategories: data?.forumCategories.map(asForumCategory),
  }
}
