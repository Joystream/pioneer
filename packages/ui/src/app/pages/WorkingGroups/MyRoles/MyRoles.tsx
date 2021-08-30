import BN from 'bn.js'
import React from 'react'

import { PageLayout, PageHeaderWrapper } from '@/app/components/PageLayout'
import { Loading } from '@/common/components/Loading'
import { ContentWithTabs, MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { Label } from '@/common/components/typography'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'
import { MyStakeStat } from '@/working-groups/components/MyStakeStat'
import { NextPayoutStat } from '@/working-groups/components/NextPayoutStat'
import { RolesList } from '@/working-groups/components/Roles/RolesList'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'

import { WorkingGroupsTabs } from '../components/WorkingGroupsTabs'

export const MyRoles = () => {
  const { isLoading, workers } = useMyWorkers()

  const owedReward = workers.reduce((a, b) => a.add(new BN(b.owedReward)), new BN(0))

  const displayRoles = () => {
    if (isLoading) {
      return <Loading />
    }

    const currentStatuses = ['WorkerStatusActive', 'WorkerStatusLeaving']
    const currentRoles = (workers && workers.filter((worker) => currentStatuses.includes(worker.status))) || []
    const pastRoles = (workers && workers.filter((worker) => !currentStatuses.includes(worker.status))) || []

    return (
      <>
        <ContentWithTabs>
          <Label>Current roles</Label>
          {currentRoles.length ? (
            <RolesList workers={currentRoles} />
          ) : (
            <NotFoundText>No current roles found</NotFoundText>
          )}
        </ContentWithTabs>
        <ContentWithTabs>
          <Label>Past roles</Label>
          {pastRoles.length ? <RolesList workers={pastRoles} /> : <NotFoundText>No past roles found</NotFoundText>}
        </ContentWithTabs>
      </>
    )
  }

  return (
    <PageLayout
      header={
        <PageHeaderWrapper>
          <PageTitle>Working Groups</PageTitle>
          <WorkingGroupsTabs />
        </PageHeaderWrapper>
      }
      main={
        <MainPanel>
          <Statistics>
            <MyEarningsStat />
            <MyStakeStat />
            <TokenValueStat title="Total owed reward" value={owedReward} />
            <NextPayoutStat workers={workers} />
          </Statistics>
          {displayRoles()}
        </MainPanel>
      }
    />
  )
}
