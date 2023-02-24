import React from 'react'

import { TabsDefinition, usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { ElectionRoutes } from '@/council/constants'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { useElectionStatusChanged } from '@/council/hooks/useElectionStatusChanged'

export const ElectionTabs = () => {
  const { stage: electionStage } = useElectionStage()
  const { hasChanged } = useElectionStatusChanged()

  const pages: TabsDefinition[] = [
    ['Past Votes', ElectionRoutes.pastVotes],
    ['Past Elections', ElectionRoutes.pastElections],
  ]

  if (electionStage !== 'inactive') {
    pages.unshift(['Election', ElectionRoutes.currentElection, { hasChanges: hasChanged }])
  }

  const tabs = usePageTabs(pages)

  return <Tabs tabs={tabs} />
}
