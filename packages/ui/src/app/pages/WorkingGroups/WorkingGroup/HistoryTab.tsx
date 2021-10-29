import React, { useState } from 'react'

import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Tabs } from '@/common/components/Tabs'
import { useGroupActivities } from '@/working-groups/hooks/useGroupActivities'
import { WorkingGroup } from '@/working-groups/types'

import { OpeningsHistory } from './components/OpeningsHistory'
import { WorkersHistory } from './components/WorkersHistory'

type Tab = 'OPENINGS' | 'WORKERS'

interface Props {
  workingGroup: WorkingGroup
}

export function HistoryTab({ workingGroup }: Props) {
  const [currentTab, setCurrentTab] = useState<Tab>('OPENINGS')
  const tabs = [
    { title: 'Past openings', active: currentTab === 'OPENINGS', onClick: () => setCurrentTab('OPENINGS') },
    { title: 'Past workers', active: currentTab === 'WORKERS', onClick: () => setCurrentTab('WORKERS') },
  ]

  return (
    <MainPanel>
      <RowGapBlock gap={32}>
        <Tabs tabsSize="xs" tabs={tabs} />
        {currentTab === 'OPENINGS' && <OpeningsHistory groupId={workingGroup?.id} />}
        {currentTab === 'WORKERS' && <WorkersHistory groupId={workingGroup?.id} />}
      </RowGapBlock>
    </MainPanel>
  )
}

export function HistoryTabSidebar({ workingGroup }: Props) {
  const { activities } = useGroupActivities(workingGroup.id)

  return (
    <SidePanel scrollable>
      <ActivitiesBlock activities={activities} label="Working Groups Activities" />
    </SidePanel>
  )
}
