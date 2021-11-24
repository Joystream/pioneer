import React from 'react'

import { TabsDefinition, usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { CouncilRoutes } from '@/council/constants'

export const CouncilTabs = () => {
  const pages: TabsDefinition[] = [
    ['Council', CouncilRoutes.council],
    ['Past Councils', CouncilRoutes.pastCouncils],
  ]

  const tabs = usePageTabs(pages)

  return <Tabs tabs={tabs} />
}
