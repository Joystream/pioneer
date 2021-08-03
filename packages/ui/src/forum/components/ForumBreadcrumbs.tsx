import React from 'react'

import { BreadcrumbsItem } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsItem'
import { BreadcrumbsListComponent } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsList'

import { ForumBreadcrumb } from '../types'

interface Props {
  forumBreadcrumbs: ForumBreadcrumb[]
  currentBreadcrumb?: string
}

export const ForumBreadcrumbs = React.memo(({ forumBreadcrumbs, currentBreadcrumb }: Props) => {
  const crumbs = forumBreadcrumbs.map((crumb) => ({
    path: `/forum/categories/${crumb.id}`,
    breadcrumb: crumb.title,
    key: crumb.id,
  }))
  currentBreadcrumb && crumbs.push({ path: '', breadcrumb: currentBreadcrumb, key: 'last:' + currentBreadcrumb })
  return (
    <BreadcrumbsListComponent>
      {crumbs.map(({ path, breadcrumb, key }, index, { length }) => (
        <BreadcrumbsItem key={key} url={path} isLink={index < length - 1}>
          {breadcrumb}
        </BreadcrumbsItem>
      ))}
    </BreadcrumbsListComponent>
  )
})
