import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Loading } from '../../../../common/components/Loading'
import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../../common/components/page/PageContent'
import { Tabs } from '../../../../common/components/Tabs'
import { OpeningsList } from '../../../../working-groups/components/OpeningsList'
import { useOpenings } from '../../../../working-groups/hooks/useOpenings'
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

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <Tabs tabs={tabs} />
        {currentTab === 'OPENINGS' && <OpeningsHistory groupId={id} />}
        {currentTab === 'WORKERS' && 'workers'}
      </MainPanel>
      <SidePanel>side</SidePanel>
    </ContentWithSidepanel>
  )
}

const OpeningsHistory = ({ groupId }: { groupId: string }) => {
  const { isLoading, openings } = useOpenings({ groupId, type: 'past' })
  return isLoading ? <Loading /> : <OpeningsList openings={openings} />
}
