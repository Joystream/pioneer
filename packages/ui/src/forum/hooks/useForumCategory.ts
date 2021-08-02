import { useMemo } from 'react'

import { useGetForumCategoryQuery } from '../queries'
import { asForumCategoryWithDetails } from '../types'

export const useForumCategory = (id: string) => {
  const { data, loading } = useGetForumCategoryQuery({ variables: { where: { id } } })
  const forumCategory = useMemo(
    () => (data?.forumCategoryByUniqueInput ? asForumCategoryWithDetails(data.forumCategoryByUniqueInput) : undefined),
    [data, loading]
  )
  return {
    isLoading: loading,
    forumCategory,
  }
}
