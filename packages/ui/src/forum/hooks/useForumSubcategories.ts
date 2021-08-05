import { useGetForumSubCategoriesQuery } from '@/forum/queries'
import { asSubCategory } from '@/forum/types'

export const useForumSubcategories = (parent_eq: string) => {
  const { data, loading } = useGetForumSubCategoriesQuery({
    variables: { where: { parent_eq }, limit: 10 },
  })
  return { isLoading: loading, subcategories: data?.forumCategories.map(asSubCategory) }
}
