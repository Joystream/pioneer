import React from 'react'
import { useParams } from 'react-router-dom'

import { useThreadBreadcrumbs } from '../hooks/useThreadBreadcrumbs'

import { ForumBreadcrumbsList } from './ForumBreadcrumbsList'

export const ThreadBreadcrumbsList = () => {
  const { id } = useParams<{ id: string }>()
  const { categoryBreadcrumbs, threadBreadcrumb } = useThreadBreadcrumbs(id)
  return <ForumBreadcrumbsList categoryBreadcrumbs={categoryBreadcrumbs} threadBreadcrumb={threadBreadcrumb} />
}
