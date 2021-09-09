import React from 'react'

import { Tabs } from '@/common/components/Tabs'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { WorkingGroupsRoutes } from '@/working-groups/constants/routes'

import { TabsDefinition, usePageTabs } from '../../../hooks/usePageTabs'

const basicTabs: TabsDefinition[] = [
  ['Openings', WorkingGroupsRoutes.openings],
  ['Working Groups', WorkingGroupsRoutes.groups],
]
const memberTabs: TabsDefinition[] = [
  ['My Applications', WorkingGroupsRoutes.myApplications],
  ['My Roles', WorkingGroupsRoutes.myRoles],
]

export const WorkingGroupsTabs = () => {
  const { hasMembers } = useMyMemberships()
  const avaliableTabs = !hasMembers ? basicTabs : basicTabs.concat(memberTabs)
  const tabs = usePageTabs(avaliableTabs)

  return <Tabs tabs={tabs} />
}
