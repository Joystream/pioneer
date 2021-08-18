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
        ...(isArchive && !isRoot
          ? { OR: [{ parent_eq: null }, { parent: { status_json: { isTypeOf_eq: ActiveStatus } } }] }
          : {}),
      },
    },
  })

  return {
    isLoading: loading,
    forumCategories: data?.forumCategories.map(asForumCategory),
  }
}
