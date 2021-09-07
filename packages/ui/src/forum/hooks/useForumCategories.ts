import { useGetForumCategoriesQuery } from '@/forum/queries'
import { asForumCategory, CategoryStatusType } from '@/forum/types'

interface Props {
  isRoot?: boolean
  isArchive?: boolean
}

export const ActiveStatus: CategoryStatusType = 'CategoryStatusActive'
export const ArchivedStatus: CategoryStatusType = 'CategoryStatusArchived'

export const useForumCategories = ({ isRoot, isArchive }: Props = {}) => {
  const { loading, data } = useGetForumCategoriesQuery({
    variables: {
      where: {
        ...(isRoot ? { parent: { id_eq: null } } : {}),
        status_json: { isTypeOf_eq: isArchive ? ArchivedStatus : ActiveStatus },
        ...(isArchive && !isRoot
          ? { OR: [{ parent: { id_eq: null } }, { parent: { status_json: { isTypeOf_eq: ActiveStatus } } }] }
          : {}),
      },
    },
  })

  return {
    isLoading: loading,
    forumCategories: data?.forumCategories.map(asForumCategory),
  }
}
