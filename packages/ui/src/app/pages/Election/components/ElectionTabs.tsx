import React from 'react'

import { TabsDefinition, usePageTabs } from '@/app/hooks/usePageTabs'
import { Tabs } from '@/common/components/Tabs'
import { ElectionRoutes } from '@/council/constants'
import { useElectionStatusChanged } from '@/council/hooks/useElectionStatusChanged'

export const ElectionTabs = () => {
  const { hasChanged } = useElectionStatusChanged()

  const pages: TabsDefinition[] = [
    ['Election', ElectionRoutes.currentElection, { hasChanges: hasChanged }],
    ['Past Votes', ElectionRoutes.pastVotes],
    ['Past Elections', ElectionRoutes.pastElections],
    ['Blacklisted Accounts', ElectionRoutes.blacklistedAccounts],
  ]

  const tabs = usePageTabs(pages)

  return <Tabs tabs={tabs} />
}
