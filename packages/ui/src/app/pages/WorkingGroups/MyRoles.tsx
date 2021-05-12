import React from 'react'

import { AppPage } from '@/app/components/AppPage'
import { Loading } from '@/common/components/Loading'
import { ContentWithTabs, MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Label } from '@/common/components/typography'
import { RolesList } from '@/working-groups/components/RolesList'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const MyRoles = () => {
  const { isLoading, workers } = useMyWorkers()

  const displayRoles = () => {
    if (isLoading) {
      return (
        <MainPanel>
          <Loading />
        </MainPanel>
      )
    }

    const currentRoles = (workers && workers.filter((worker) => worker.status === 'WorkerStatusActive')) || []
    const pastRoles = (workers && workers.filter((worker) => worker.status !== 'WorkerStatusActive')) || []

    return (
      <MainPanel>
        <ContentWithTabs>
          <Label>Current roles</Label>
          <RolesList workers={currentRoles} />
        </ContentWithTabs>
        <ContentWithTabs>
          <Label>Past roles</Label>
          <RolesList workers={pastRoles} />
        </ContentWithTabs>
      </MainPanel>
    )
  }

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs />
      </PageHeader>
      {displayRoles()}
    </AppPage>
  )
}
