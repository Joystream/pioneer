import React from 'react'
import { useParams } from 'react-router-dom'

import { useForumCategoryBreadcrumbs } from '../hooks/useForumCategoryBreadcrumbs'

import { ForumBreadcrumbsList } from './ForumBreadcrumbsList'

export const CategoryBreadcrumbsList = () => {
  const { id } = useParams<{ id: string }>()
  const { breadcrumbs } = useForumCategoryBreadcrumbs(id)
  return <ForumBreadcrumbsList categoryBreadcrumbs={breadcrumbs} />
}
