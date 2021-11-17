import { useGetForumCategoriesQuery, useGetArchivedForumCategoriesQuery } from '@/forum/queries'
import { asForumCategory, asArchivedForumCategory, CategoryStatusType } from '@/forum/types'

interface Props {
  isRoot?: boolean
}

export const ActiveStatus: CategoryStatusType = 'CategoryStatusActive'
export const ArchivedStatus: CategoryStatusType = 'CategoryStatusArchived'

export const useForumCategories = ({ isRoot }: Props = {}) => {
  const { loading, data } = useGetForumCategoriesQuery({
    variables: {
      where: {
        ...(isRoot ? { parent: { id_eq: null } } : {}),
        status_json: { isTypeOf_eq: ActiveStatus },
      },
    },
  })
  return {
    isLoading: loading,
    forumCategories: data?.forumCategories.map(asForumCategory),
  }
}

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
