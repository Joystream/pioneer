import React from 'react'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { ForumRoutes } from '@/forum/constant'
import { useMyThreads, UseMyThreadsProps } from '@/forum/hooks/useMyThreads'

const order = { orderKey: 'updatedAt', isDescending: true }

export const ForumTabs = () => {
  const { totalCount } = useMyThreads({ page: 1, order } as UseMyThreadsProps)
  const tabs = usePageTabs([
    ['Forum', ForumRoutes.forum],
    ['My Threads', ForumRoutes.myThreads, totalCount],
    ['Watchlist', ForumRoutes.watchlist],
    ['Archived', ForumRoutes.archived],
  ])

  return <Tabs tabs={tabs} />
}
