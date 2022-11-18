import React from 'react'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { ForumRoutes } from '@/forum/constant'

export const ForumTabs = () => {
  const tabs = usePageTabs([
    ['Forum', ForumRoutes.forum],
    ['My Threads', ForumRoutes.myThreads],
    ['Watchlist', ForumRoutes.watchlist],
    ['Archived', ForumRoutes.archived],
  ])

  return <Tabs tabs={tabs} />
}
