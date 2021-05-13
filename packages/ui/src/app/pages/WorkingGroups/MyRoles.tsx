import BN from 'bn.js'
import React from 'react'

import { AppPage } from '@/app/components/AppPage'
import { Loading } from '@/common/components/Loading'
import { ContentWithTabs, MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { MultiTokenValueStat, Statistics, TokenValueStat } from '@/common/components/statistics'
import { Label, TextBig } from '@/common/components/typography'
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
    console.log(JSON.stringify(currentRoles))
    return (
      <MainPanel>
        <Statistics>
          <MultiTokenValueStat
            title="Total earned in the past"
            values={[
              {
                label: '24 hours',
                value: new BN(200),
              },
              {
                label: 'Month',
                value: new BN(10200000),
              },
            ]}
          />
          <TokenValueStat title="Total stake height" value={150000} />
          <TokenValueStat title="Total owed reward" value={150000} />
          <TokenValueStat title="Next payout in" value={150000} />
        </Statistics>
        <ContentWithTabs>
          <Label>Current roles</Label>
          {currentRoles.length ? <RolesList workers={currentRoles} /> : <TextBig>No current roles found</TextBig>}
        </ContentWithTabs>
        <ContentWithTabs>
          <Label>Past roles</Label>
          {pastRoles.length ? <RolesList workers={pastRoles} /> : <TextBig>No past roles found</TextBig>}
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
