import React from 'react'

import { TabsDefinition, usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { CouncilRoutes } from '@/council/constants'
import { useElectionStage } from '@/council/hooks/useElectionStage'

export const CouncilTabs = () => {
  const electionStage = useElectionStage()

  const pages: TabsDefinition[] = [
    ['Council', CouncilRoutes.council],
    ['Past Councils', CouncilRoutes.pastCouncils],
    ['Past Votes', CouncilRoutes.pastVotes],
    ['Past Elections', CouncilRoutes.pastElections],
  ]

  if (electionStage !== 'inactive') {
    pages.unshift(['Election', CouncilRoutes.currentElection])
  }

  const tabs = usePageTabs(pages)

  return <Tabs tabs={tabs} />
}
