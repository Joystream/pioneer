import React, { useState } from 'react'
import styled from 'styled-components'

import { ListHeaders } from '@/common/components/List/ListHeader'
import { TabProps, Tabs } from '@/common/components/Tabs'
import { PastCouncilMembers } from '@/council/components/pastCouncil/PastCouncilMembers/PastCouncilMembers'
import { PastCouncilProposals } from '@/council/components/pastCouncil/PastCouncilProposals/PastCouncilProposals'
import { PastCouncilWorkingGroups } from '@/council/components/pastCouncil/PastCouncilWorkingGroups/PastCouncilWorkingGroups'
import { PastCouncilWithDetails } from '@/council/types/PastCouncil'

export const PastCouncilTabs = (council: PastCouncilWithDetails) => {
  const cycleId = +council?.cycleId
  const [tab, setTab] = useState<'councilMembers' | 'proposals' | 'workingGroups'>('councilMembers')

  const tabs: TabProps[] = [
    {
      title: 'Council Members',
      active: tab === 'councilMembers',
      onClick: () => setTab('councilMembers'),
    },
    {
      title: 'Proposals',
      active: tab === 'proposals',
      onClick: () => setTab('proposals'),
    },
    {
      title: 'Working Groups',
      active: tab === 'workingGroups',
      onClick: () => setTab('workingGroups'),
    },
  ]

  return (
    <>
      <Tabs tabs={tabs} tabsSize="xs" />
      {tab === 'councilMembers' && <PastCouncilMembers cycleId={cycleId} />}
      {tab === 'proposals' && <PastCouncilProposals cycleId={cycleId} />}
      {tab === 'workingGroups' && <PastCouncilWorkingGroups cycleId={cycleId} />}
    </>
  )
}

export const PastCouncilTabsHeaders = styled(ListHeaders)`
  padding-right: 16px;
`
