import { useGetForumCategoriesQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumCategory } from '@/forum/types'

export const useForumCategories = (parent_eq: string | null = null) => {
  const { loading, data } = useGetForumCategoriesQuery({ variables: { where: { parent_eq } } })
  const connection = data?.forumCategoriesConnection

  return {
    isLoading: loading,
    forumCategories: connection?.edges.map(({ node }) => asForumCategory(node)) ?? [],
    totalCount: connection?.totalCount,
  }
}
