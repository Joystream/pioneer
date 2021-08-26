import React from 'react'
import styled from 'styled-components'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { ForumRoutes } from '@/forum/constant'

export const ForumTabs = () => {
  const tabs = usePageTabs([
    ['Overview', ForumRoutes.overview],
    ['Forum', ForumRoutes.forum],
    ['Archived', ForumRoutes.archived],
  ])

  return <Tabs tabs={tabs} />
}

interface ForumForumTabsProps {
  categoryCount?: number
}

export const ForumForumTabs = ({ categoryCount }: ForumForumTabsProps) => {
  const tabs = usePageTabs([
    ['Categories', ForumRoutes.forum, categoryCount],
    ['Latest threads ', ForumRoutes.latestThreads],
    ['Top threads', ForumRoutes.topThreads],
    ['Tags', ForumRoutes.tags],
    ['My threads', ForumRoutes.myThreads],
  ])

  return <ForumForumTabsStyles tabsSize="xs" tabs={tabs} />
}

const ForumForumTabsStyles = styled(Tabs)`
  margin-top: 8px;
`
