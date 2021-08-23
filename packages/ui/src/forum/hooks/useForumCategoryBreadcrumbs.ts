import { useMemo } from 'react'

import { useGetForumCategoryBreadcrumbsQuery } from '../queries'
import { asCategoryBreadcrumbs } from '../types'

export const useForumCategoryBreadcrumbs = (id: string) => {
  const { data, loading } = useGetForumCategoryBreadcrumbsQuery({ variables: { where: { id } } })
  const breadcrumbs = useMemo(
    () => (data?.forumCategoryByUniqueInput ? asCategoryBreadcrumbs(data.forumCategoryByUniqueInput) : undefined),
    [data, loading]
  )
  return {
    isLoading: loading,
    breadcrumbs,
  }
}
