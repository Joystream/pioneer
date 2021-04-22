import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { ActivitiesBlock } from '../../../../common/components/Activities/ActivitiesBlock'
import { Loading } from '../../../../common/components/Loading'
import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../../common/components/page/PageContent'
import { Tabs } from '../../../../common/components/Tabs'
import { useActivities } from '../../../../common/hooks/useActivities'
import { OpeningsList } from '../../../../working-groups/components/OpeningsList'
import { WorkersList } from '../../../../working-groups/components/WorkersList'
import { useOpenings } from '../../../../working-groups/hooks/useOpenings'
import { useWorkers } from '../../../../working-groups/hooks/useWorkers'
import { useWorkingGroup } from '../../../../working-groups/hooks/useWorkingGroup'

type Tab = 'OPENINGS' | 'WORKERS'

export function HistoryTab() {
  const { id } = useParams<{ id: string }>()
  useWorkingGroup(id)

  const [currentTab, setCurrentTab] = useState<Tab>('OPENINGS')
  const tabs = [
    { title: 'Past openings', active: currentTab === 'OPENINGS', onClick: () => setCurrentTab('OPENINGS') },
    { title: 'Past workers', active: currentTab === 'WORKERS', onClick: () => setCurrentTab('WORKERS') },
  ]
  const activities = useActivities()

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <Tabs tabs={tabs} />
        {currentTab === 'OPENINGS' && <OpeningsHistory groupId={id} />}
        {currentTab === 'WORKERS' && <WorkersHistory groupId={id} />}
      </MainPanel>
      <SidePanel>
        <ActivitiesBlock activities={activities} label="Working Groups Activities" />
      </SidePanel>
    </ContentWithSidepanel>
  )
}

const OpeningsHistory = ({ groupId }: { groupId: string }) => {
  const { isLoading, openings } = useOpenings({ groupId, type: 'past' })
  return isLoading ? <Loading /> : <OpeningsList openings={openings} />
}

const WorkersHistory = ({ groupId }: { groupId: string }) => {
  const { isLoading, workers } = useWorkers(groupId, false)
  return isLoading ? <Loading /> : <WorkersList workers={workers} />
}
