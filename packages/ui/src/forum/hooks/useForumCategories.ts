import { useGetForumCategoriesQuery } from '@/forum/queries'
import { asForumCategory, CategoryStatus } from '@/forum/types'

interface Props {
  isRoot?: boolean
  isArchive?: boolean
}

export const ActiveStatus: CategoryStatus = 'CategoryStatusActive'
export const ArchivedStatus: CategoryStatus = 'CategoryStatusArchived'

export const useForumCategories = ({ isRoot, isArchive }: Props = {}) => {
  const { loading, data } = useGetForumCategoriesQuery({
    variables: {
      where: {
        ...(isRoot ? { parent_eq: null } : {}),
        status_json: { isTypeOf_eq: isArchive ? ArchivedStatus : ActiveStatus },
      },
    },
  })

  return {
    isLoading: loading,
    forumCategories: data?.forumCategories.map(asForumCategory),
  }
}
