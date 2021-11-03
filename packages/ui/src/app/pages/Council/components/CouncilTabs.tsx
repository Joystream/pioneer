import React from 'react'

import { TabsDefinition, usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { CouncilRoutes } from '@/council/constants'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { useElectionStatusChanged } from '@/council/hooks/useElectionStatusChanged'

export const CouncilTabs = () => {
  const { stage: electionStage } = useElectionStage()
  const { hasChanged } = useElectionStatusChanged()

  const pages: TabsDefinition[] = [
    ['Council', CouncilRoutes.council],
    ['Past Councils', CouncilRoutes.pastCouncils],
    ['Past Votes', CouncilRoutes.pastVotes],
    ['Past Elections', CouncilRoutes.pastElections],
  ]

  if (electionStage !== 'inactive') {
    pages.unshift(['Election', CouncilRoutes.currentElection, { hasChanges: hasChanged }])
  }

  const tabs = usePageTabs(pages)

  return <Tabs tabs={tabs} />
}
