import React from 'react'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'

export const ForumTabs = () => {
  const tabs = usePageTabs([
    ['Overview', '/#'],
    ['Forum', '/forum'],
    ['Archived', '/#'],
  ])

  return <Tabs tabs={tabs} />
}

export const ForumForumTabs = () => {
  const tabs = usePageTabs([
    ['Categories', '/forum'],
    ['Latest threads ', '/#'],
    ['Top threads', '/#'],
    ['Tags', '/#'],
    ['My threads', '/#'],
  ])

  return <Tabs tabs={tabs} />
}
