import React from 'react'
import styled from 'styled-components'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { spacing } from '@/common/utils/styles'

export const ForumTabs = () => {
  const tabs = usePageTabs([
    ['Overview', '/forum/#'],
    ['Forum', '/forum'],
    ['Archived', '/forum/#'],
  ])

  return <Tabs tabs={tabs} />
}

interface ForumForumTabsProps {
  categoryCount?: number
}
export const ForumForumTabs = ({ categoryCount }: ForumForumTabsProps) => {
  const tabs = usePageTabs([
    ['Categories', '/forum', categoryCount],
    ['Latest threads ', '/forum/#'],
    ['Top threads', '/forum/#'],
    ['Tags', '/forum/#'],
    ['My threads', '/forum/#'],
  ])

  return <ForumForumTabsStyles tabsSize="xs" tabs={tabs} />
}

const ForumForumTabsStyles = styled(Tabs)`
  margin-top: ${spacing(1)};
`
