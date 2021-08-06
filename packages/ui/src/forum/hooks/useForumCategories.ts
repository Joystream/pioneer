import { useMemo } from 'react'

import { AN_HOUR } from '@/common/constants'
import { useGetForumCategoriesQuery } from '@/forum/queries/__generated__/forum.generated'
import { asForumCategory } from '@/forum/types'

export const useForumCategories = (parent_eq?: string) => {
  const where = useMemo(
    // HACK: use `forumcategoryparent_none` to fetch root categories
    () => (parent_eq ? { parent_eq } : { forumcategoryparent_none: { createdAt_lt: new Date(Date.now() + AN_HOUR) } }),
    [parent_eq]
  )
  const { loading, data } = useGetForumCategoriesQuery({ variables: { where } })
  const connection = data?.forumCategoriesConnection

  return {
    isLoading: loading,
    forumCategories: connection?.edges.map(({ node }) => asForumCategory(node)) ?? [],
    totalCount: connection?.totalCount,
  }
}
