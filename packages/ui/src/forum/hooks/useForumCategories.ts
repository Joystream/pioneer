import { useGetForumCategoriesQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumCategory } from '@/forum/types'

interface Props {
  parentId?: string | null
  isArchived?: boolean
}

export const useForumCategories = ({ parentId = null }: Props = {}) => {
  const { loading, data } = useGetForumCategoriesQuery({ variables: { where: { parent_eq: parentId } } })

  return {
    isLoading: loading,
    forumCategories: data?.forumCategories.map(asForumCategory),
  }
}
