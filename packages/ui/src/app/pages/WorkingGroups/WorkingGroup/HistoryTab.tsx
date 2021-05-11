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
  const { name } = useParams<{ name: string }>()
  const { group } = useWorkingGroup({ name })

  const [currentTab, setCurrentTab] = useState<Tab>('OPENINGS')
  const tabs = [
    { title: 'Past openings', active: currentTab === 'OPENINGS', onClick: () => setCurrentTab('OPENINGS') },
    { title: 'Past workers', active: currentTab === 'WORKERS', onClick: () => setCurrentTab('WORKERS') },
  ]
  const activities = useActivities()

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <Tabs tabsSize="xs" tabs={tabs} />
        {currentTab === 'OPENINGS' && <OpeningsHistory groupId={group?.id} />}
        {currentTab === 'WORKERS' && <WorkersHistory groupId={group?.id} />}
      </MainPanel>
      <SidePanel>
        <ActivitiesBlock activities={activities} label="Working Groups Activities" />
      </SidePanel>
    </ContentWithSidepanel>
  )
}

const OpeningsHistory = ({ groupId }: { groupId: string | undefined }) => {
  const { isLoading, openings } = useOpenings({ groupId, type: 'past' })
  return isLoading ? <Loading /> : <OpeningsList openings={openings} />
}

const WorkersHistory = ({ groupId }: { groupId: string | undefined }) => {
  const { isLoading, workers } = useWorkers({ groupId, fetchPast: true })
  return isLoading ? <Loading /> : <WorkersList workers={workers} />
}
