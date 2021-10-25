import React, { useState } from 'react'

import { TabProps, Tabs } from '@/common/components/Tabs'
import { PastCouncilWithDetails } from '@/council/types/PastCouncil'

interface PastCouncilTabsProps {
  council: PastCouncilWithDetails
}

export const PastCouncilTabs = ({ council }: PastCouncilTabsProps) => {
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
    </>
  )
}
