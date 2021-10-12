import React, { useState } from 'react'

import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { ContentWithSidepanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
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
  const { activities } = useGroupActivities(workingGroup.id)

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <RowGapBlock gap={32}>
          <Tabs tabsSize="xs" tabs={tabs} />
          {currentTab === 'OPENINGS' && <OpeningsHistory groupId={workingGroup?.id} />}
          {currentTab === 'WORKERS' && <WorkersHistory groupId={workingGroup?.id} />}
        </RowGapBlock>
      </MainPanel>
      <SidePanel>
        <ActivitiesBlock activities={activities} label="Working Groups Activities" />
      </SidePanel>
    </ContentWithSidepanel>
  )
}
