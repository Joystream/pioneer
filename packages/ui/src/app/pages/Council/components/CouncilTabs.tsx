import React from 'react'

import { usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { CouncilRoutes } from '@/council/constants'

export const CouncilTabs = () => {
  const tabs = usePageTabs([
    ['Election', CouncilRoutes.currentElection],
    ['Council', CouncilRoutes.council],
    ['Past Councils', CouncilRoutes.pastCouncils],
    ['Past Votes', CouncilRoutes.pastVotes],
    ['Past Elections', CouncilRoutes.pastElections],
  ])

  return <Tabs tabs={tabs} />
}
