import { useMemo } from 'react'

import { useGetForumCategoryBreadcrumbsQuery } from '../queries'
import { asForumBreadcrumbs } from '../types'

export const useForumBreadcrumbs = (id: string) => {
  const { data, loading } = useGetForumCategoryBreadcrumbsQuery({ variables: { where: { id } } })
  const breadcrumbs = useMemo(
    () => (data?.forumCategoryByUniqueInput ? asForumBreadcrumbs(data.forumCategoryByUniqueInput) : undefined),
    [data, loading]
  )
  return {
    isLoading: loading,
    breadcrumbs,
  }
}
