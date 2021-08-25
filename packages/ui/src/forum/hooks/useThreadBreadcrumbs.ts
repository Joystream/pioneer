import { useMemo } from 'react'

import { useGetForumThreadBreadcrumbsQuery } from '../queries'
import { asThreadBreadcrumbs } from '../types'

export const useThreadBreadcrumbs = (id: string) => {
  const { data, loading } = useGetForumThreadBreadcrumbsQuery({ variables: { where: { id } } })
  const breadcrumbs = useMemo(
    () =>
      data?.forumThreadByUniqueInput
        ? asThreadBreadcrumbs(data.forumThreadByUniqueInput)
        : { threadBreadcrumb: { id, title: `Thread ${id}` }, categoryBreadcrumbs: [] },
    [data, loading]
  )
  return {
    isLoading: loading,
    ...breadcrumbs,
  }
}
