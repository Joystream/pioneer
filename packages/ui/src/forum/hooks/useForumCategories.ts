import { useGetForumCategoriesQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumCategory } from '@/forum/types'

export const useForumCategories = () => {
  const { loading, data } = useGetForumCategoriesQuery()

  return {
    isLoading: loading,
    forumCategories: data?.forumCategories.map(asForumCategory) ?? [],
  }
}
