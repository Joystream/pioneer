import React from 'react'

import { Tabs } from '@/common/components/Tabs'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { TabsDefinition, usePageTabs } from '../../../hooks/usePageTabs'

const basicTabs: TabsDefinition[] = [
  ['Openings', '/working-groups/openings'],
  ['Working Groups', '/working-groups'],
]
const memberTabs: TabsDefinition[] = [
  ['My Applications', '/working-groups/my-applications'],
  ['My Roles', '/working-groups/my-roles'],
]

export const WorkingGroupsTabs = () => {
  const { hasMembers } = useMyMemberships()
  const avaliableTabs = !hasMembers ? basicTabs : basicTabs.concat(memberTabs)
  const tabs = usePageTabs(avaliableTabs)

  return <Tabs tabs={tabs} />
}
