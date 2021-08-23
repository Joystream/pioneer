import React from 'react'

import { BreadcrumbsNavigation } from '@/common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { BreadcrumbsItem } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsItem'
import { BreadcrumbsListComponent } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsList'
import { HomeLink } from '@/common/components/page/Sidebar/Breadcrumbs/HomeLink'

import { CategoryBreadcrumb, ThreadBreadcrumb } from '../types'

interface ForumBreadcrumbsProps {
  threadBreadcrumb?: ThreadBreadcrumb
  categoryBreadcrumbs: CategoryBreadcrumb[]
}

export const ForumBreadcrumbs = React.memo(({ categoryBreadcrumbs, threadBreadcrumb }: ForumBreadcrumbsProps) => {
  const crumbs = categoryBreadcrumbs.map((crumb) => ({
    path: `/forum/forum/${crumb.id}`,
    breadcrumb: crumb.title,
    key: crumb.id,
  }))
  return (
    <BreadcrumbsNavigation>
      <HomeLink />
      <BreadcrumbsListComponent>
        <BreadcrumbsItem url="/forum" isLink>
          Forum
        </BreadcrumbsItem>
        {crumbs.map(({ path, breadcrumb, key }, index, { length }) => (
          <BreadcrumbsItem key={key} url={path} isLink={!!threadBreadcrumb || index < length - 1}>
            {breadcrumb}
          </BreadcrumbsItem>
        ))}
        {threadBreadcrumb && (
          <BreadcrumbsItem url={`/forum/thread/${threadBreadcrumb.id}`}>{threadBreadcrumb.title}</BreadcrumbsItem>
        )}
      </BreadcrumbsListComponent>
    </BreadcrumbsNavigation>
  )
})
