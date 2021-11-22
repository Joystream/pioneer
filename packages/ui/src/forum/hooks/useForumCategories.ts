import { useGetForumCategoriesQuery } from '@/forum/queries'
import { asForumCategory, CategoryStatusType } from '@/forum/types'

interface Props {
  isRoot?: boolean
}

export const ActiveStatus: CategoryStatusType = 'CategoryStatusActive'

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
