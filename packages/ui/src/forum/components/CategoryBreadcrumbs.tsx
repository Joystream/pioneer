import React from 'react'
import { useParams } from 'react-router-dom'

import { BreadcrumbsNavigation } from '@/common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { HomeLink } from '@/common/components/page/Sidebar/Breadcrumbs/HomeLink'

import { useForumCategoryBreadcrumbs } from '../hooks/useForumCategoryBreadcrumbs'

import { ForumBreadcrumbsList } from './ForumBreadcrumbsList'

export const CategoryBreadcrumbs = () => {
  const { id } = useParams<{ id: string }>()
  const { breadcrumbs } = useForumCategoryBreadcrumbs(id)
  return (
    <BreadcrumbsNavigation>
      <HomeLink />
      <ForumBreadcrumbsList categoryBreadcrumbs={breadcrumbs} />
    </BreadcrumbsNavigation>
  )
}
