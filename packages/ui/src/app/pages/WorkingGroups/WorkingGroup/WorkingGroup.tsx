import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Loading } from '../../../../common/components/Loading'
import { PageHeader } from '../../../../common/components/page/PageHeader'
import { PageTitle } from '../../../../common/components/page/PageTitle'
import { PreviousPage } from '../../../../common/components/page/PreviousPage'
import { Tabs } from '../../../../common/components/Tabs'
import { useWorkingGroup } from '../../../../working-groups/hooks/useWorkingGroup'
import { AppPage } from '../../../components/AppPage'

import { AboutTab } from './AboutTab'
import { HistoryTab } from './HistoryTab'
import { OpeningsTab } from './OpeningsTab'

type Tab = 'OPENINGS' | 'ABOUT' | 'HISTORY'

export function WorkingGroup() {
  const [currentTab, setCurrentTab] = useState<Tab>('OPENINGS')
  const { id } = useParams<{ id: string }>()
  const { isLoading, group } = useWorkingGroup(id)

  const tabs = [
    { title: 'Openings', active: currentTab === 'OPENINGS', onClick: () => setCurrentTab('OPENINGS') },
    { title: 'About', active: currentTab === 'ABOUT', onClick: () => setCurrentTab('ABOUT') },
    { title: 'History', active: currentTab === 'HISTORY', onClick: () => setCurrentTab('HISTORY') },
  ]

  if (isLoading || !group) {
    return <Loading />
  }

  return (
    <AppPage lastBreadcrumb={group?.name}>
      <PageHeader>
        <PreviousPage>
          <PageTitle>{group?.name}</PageTitle>
        </PreviousPage>
        <Tabs tabs={tabs} />
      </PageHeader>
      {currentTab === 'OPENINGS' && <OpeningsTab workingGroup={group} />}
      {currentTab === 'ABOUT' && <AboutTab workingGroup={group} />}
      {currentTab === 'HISTORY' && <HistoryTab />}
    </AppPage>
  )
}
