import React from 'react'
import styled from 'styled-components'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { ForumRoutes } from '@/forum/constant'

export const ForumTabs = () => {
  const tabs = usePageTabs([
    ['Overview', ForumRoutes.root],
    ['Forum', ForumRoutes.forum],
    ['Archived', ForumRoutes.root],
  ])

  return <Tabs tabs={tabs} />
}

interface ForumForumTabsProps {
  categoryCount?: number
}
export const ForumForumTabs = ({ categoryCount }: ForumForumTabsProps) => {
  const tabs = usePageTabs([
    ['Categories', ForumRoutes.forum, categoryCount],
    ['Latest threads ', ForumRoutes.root],
    ['Top threads', ForumRoutes.root],
    ['Tags', ForumRoutes.root],
    ['My threads', ForumRoutes.root],
  ])

  return <ForumForumTabsStyles tabsSize="xs" tabs={tabs} />
}

const ForumForumTabsStyles = styled(Tabs)`
  margin-top: 8px;
`
