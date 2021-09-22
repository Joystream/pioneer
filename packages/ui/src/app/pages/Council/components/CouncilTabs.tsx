import React from 'react'

import { TabsDefinition, usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { CouncilRoutes } from '@/council/constants'
import { useElectionState } from '@/council/hooks/useElectionState'

export const CouncilTabs = () => {
  const electionState = useElectionState()

  const pages: TabsDefinition[] = [
    ['Council', CouncilRoutes.council],
    ['Past Councils', CouncilRoutes.pastCouncils],
    ['Past Votes', CouncilRoutes.pastVotes],
    ['Past Elections', CouncilRoutes.pastElections],
  ]

  if (electionState !== 'inactive') {
    pages.unshift(['Election', CouncilRoutes.currentElection])
  }

  const tabs = usePageTabs(pages)

  return <Tabs tabs={tabs} />
}
