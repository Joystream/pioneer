import React from 'react'
import { generatePath, useParams } from 'react-router-dom'

import { usePageTabs, TabsDefinition } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { WorkingGroupsRoutes } from '@/working-groups/constants/routes'

const workingGroupTabs: TabsDefinition[] = [
  ['Openings', WorkingGroupsRoutes.groupOpenings],
  ['About', WorkingGroupsRoutes.group],
  ['History', WorkingGroupsRoutes.groupHistory],
]

export const WorkingGroupTabs = () => {
  const { name } = useParams<{ name: string }>()
  const tabs = usePageTabs(workingGroupTabs.map(([title, path]) => [title, generatePath(path, { name })]))

  return <Tabs tabs={tabs} />
}
