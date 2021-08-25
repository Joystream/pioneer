import React from 'react'

import { BreadcrumbsItem } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsItem'
import { BreadcrumbsListComponent } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsList'

import { CategoryBreadcrumb, ThreadBreadcrumb } from '../types'

interface ForumBreadcrumbsProps {
  threadBreadcrumb?: ThreadBreadcrumb
  categoryBreadcrumbs?: CategoryBreadcrumb[]
  nonInteractive?: boolean
}

export const ForumBreadcrumbsList = React.memo(
  ({ categoryBreadcrumbs, threadBreadcrumb, nonInteractive }: ForumBreadcrumbsProps) => {
    const crumbs = categoryBreadcrumbs?.map((crumb) => ({
      path: `/forum/forum/${crumb.id}`,
      breadcrumb: crumb.title,
      key: crumb.id,
    }))
    return (
      <BreadcrumbsListComponent>
        <BreadcrumbsItem url="/forum" isLink={!nonInteractive}>
          Forum
        </BreadcrumbsItem>
        {crumbs?.map(({ path, breadcrumb, key }, index, { length }) => (
          <BreadcrumbsItem key={key} url={path} isLink={!nonInteractive && (!!threadBreadcrumb || index < length - 1)}>
            {breadcrumb}
          </BreadcrumbsItem>
        ))}
        {threadBreadcrumb && (
          <BreadcrumbsItem url={`/forum/thread/${threadBreadcrumb.id}`}>{threadBreadcrumb.title}</BreadcrumbsItem>
        )}
      </BreadcrumbsListComponent>
    )
  }
)
