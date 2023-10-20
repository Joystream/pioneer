import { useEffect, useMemo, useState } from 'react'

import { useGetForumCategoryBreadcrumbQuery } from '../queries'
import { asSubCategory, CategoryBreadcrumb } from '../types'

// The goal of this hook is to utilize apollo cache to be faster than `useForumCategoryBreadcrumbs`
// when there are a lot of breadcrumbs to show, like on search results
export const useForumMultiQueryCategoryBreadCrumbs = (id: string) => {
  const placeholder = useMemo(() => [{ id, title: `Category ${id}` }], [id])
  const [breadcrumbs, setBreadcrumbs] = useState<CategoryBreadcrumb[]>([])
  const [nextId, setNextId] = useState(id)
  const { data } = useGetForumCategoryBreadcrumbQuery({ variables: { where: { id: nextId } }, skip: !nextId })

  useEffect(() => {
    const category = data?.forumCategoryByUniqueInput
    if (!category) return

    setNextId(category.parentId ?? '')
    setBreadcrumbs([asSubCategory(category), ...breadcrumbs])
  }, [data])

  return {
    isLoading: !!nextId,
    breadcrumbs: nextId ? placeholder : breadcrumbs,
  }
}
