import React, { useState } from 'react'
import styled from 'styled-components'

import { ListHeaders } from '@/common/components/List/ListHeader'
import { TabProps, Tabs } from '@/common/components/Tabs'
import { PastCouncilMembers } from '@/council/components/pastCouncil/PastCouncilMembers/PastCouncilMembers'
import { PastCouncilProposals } from '@/council/components/pastCouncil/PastCouncilProposals/PastCouncilProposals'
import { PastCouncilWorkingGroups } from '@/council/components/pastCouncil/PastCouncilWorkingGroups/PastCouncilWorkingGroups'
import { PastCouncilWithDetails } from '@/council/types/PastCouncil'

export const PastCouncilTabs = ({ id }: PastCouncilWithDetails) => {
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
      {tab === 'councilMembers' && <PastCouncilMembers councilId={id} />}
      {tab === 'proposals' && <PastCouncilProposals councilId={id} />}
      {tab === 'workingGroups' && <PastCouncilWorkingGroups councilId={id} />}
    </>
  )
}

export const PastCouncilTabsHeaders = styled(ListHeaders)`
  padding-right: 16px;
`
