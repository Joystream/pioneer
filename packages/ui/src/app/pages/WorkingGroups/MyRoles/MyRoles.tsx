import React from 'react'

import { AppPage } from '@/app/components/AppPage'
import { Loading } from '@/common/components/Loading'
import { ContentWithTabs, MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { Label, TextBig } from '@/common/components/typography'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'
import { MyStakeStat } from '@/working-groups/components/MyStakeStat'
import { NextPayoutStat } from '@/working-groups/components/NextPayoutStat'
import { RolesList } from '@/working-groups/components/Roles/RolesList'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'

import { WorkingGroupsTabs } from '../components/WorkingGroupsTabs'

export const MyRoles = () => {
  const { isLoading, workers } = useMyWorkers()

  const displayRoles = () => {
    if (isLoading) {
      return <Loading />
    }

    const currentRoles = (workers && workers.filter((worker) => worker.status === 'WorkerStatusActive')) || []
    const pastRoles = (workers && workers.filter((worker) => worker.status !== 'WorkerStatusActive')) || []

    return (
      <>
        <ContentWithTabs>
          <Label>Current roles</Label>
          {currentRoles.length ? <RolesList workers={currentRoles} /> : <TextBig>No current roles found</TextBig>}
        </ContentWithTabs>
        <ContentWithTabs>
          <Label>Past roles</Label>
          {pastRoles.length ? <RolesList workers={pastRoles} /> : <TextBig>No past roles found</TextBig>}
        </ContentWithTabs>
      </>
    )
  }

  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs />
      </PageHeader>
      <MainPanel>
        <Statistics>
          <MyEarningsStat />
          <MyStakeStat />
          <TokenValueStat title="Total owed reward" value={150000} />
          <NextPayoutStat workers={workers} />
        </Statistics>
        {displayRoles()}
      </MainPanel>
    </AppPage>
  )
}
