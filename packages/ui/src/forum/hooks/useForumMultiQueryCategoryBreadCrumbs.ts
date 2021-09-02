import { useEffect, useMemo, useState } from 'react'

import { useGetForumCategoryBreadcrumbLazyQuery } from '../queries'
import { asSubCategory, CategoryBreadcrumb } from '../types'

// The goal of this hook is to utilize apollo cache to be faster than `useForumCategoryBreadcrumbs`
// when there are a lot of breadcrumbs to show, like on search results
export const useForumMultiQueryCategoryBreadCrumbs = (id: string) => {
  const placeholder = useMemo(() => [{ id, title: `Category ${id}` }], [id])
  const [isLoading, setIsLoading] = useState(true)
  const [breadcrumbs, setBreadcrumbs] = useState<CategoryBreadcrumb[]>([])
  const [getCategory, { data }] = useGetForumCategoryBreadcrumbLazyQuery()

  useEffect(() => {
    setBreadcrumbs([])
    getCategory({ variables: { where: { id } } })
  }, [id])

  useEffect(() => {
    const category = data?.forumCategoryByUniqueInput
    if (!category) return

    if (category.parentId) {
      getCategory({ variables: { where: { id: category.parentId } } })
    } else {
      setIsLoading(false)
    }
    setBreadcrumbs([asSubCategory(category), ...breadcrumbs])
  }, [data])

  return {
    isLoading,
    breadcrumbs: isLoading ? placeholder : breadcrumbs,
  }
}
