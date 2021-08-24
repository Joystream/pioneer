import React from 'react'
import { useParams } from 'react-router-dom'

import { BreadcrumbsNavigation } from '@/common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'
import { HomeLink } from '@/common/components/page/Sidebar/Breadcrumbs/HomeLink'

import { useThreadBreadcrumbs } from '../hooks/useThreadBreadcrumbs'

import { ForumBreadcrumbsList } from './ForumBreadcrumbsList'

export const ThreadBreadcrumbs = () => {
  const { id } = useParams<{ id: string }>()
  const { categoryBreadcrumbs, threadBreadcrumb } = useThreadBreadcrumbs(id)
  return (
    <BreadcrumbsNavigation>
      <HomeLink />
      <ForumBreadcrumbsList categoryBreadcrumbs={categoryBreadcrumbs} threadBreadcrumb={threadBreadcrumb} />
    </BreadcrumbsNavigation>
  )
}
