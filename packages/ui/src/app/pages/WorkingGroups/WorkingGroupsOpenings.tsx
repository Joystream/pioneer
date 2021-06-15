import React, { useRef, useState } from 'react'

import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { ContentWithTabs, MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Statistics } from '@/common/components/statistics'
import { Tabs } from '@/common/components/Tabs'
import { useActivities } from '@/common/hooks/useActivities'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'
import { MyRolesStat } from '@/working-groups/components/MyRolesStat'
import { MyStakeStat } from '@/working-groups/components/MyStakeStat'
import { LoadingOpenings } from '@/working-groups/components/OpeningsList'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useUpcomingOpenings } from '@/working-groups/hooks/useUpcomingOpenings'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

type OpeningsTabs = 'OPENINGS' | 'UPCOMING'

export const WorkingGroupsOpenings = () => {
  const { isLoading: upcomingLoading, upcomingOpenings } = useUpcomingOpenings({})
  const { isLoading: currentLoading, openings } = useOpenings({ statusIn: ['open'] })
  const activities = useActivities()
  const [activeTab, setActiveTab] = useState<OpeningsTabs>('OPENINGS')
  const sideNeighborRef = useRef<HTMLDivElement>(null)

  const openingsTabs = [
    {
      title: 'Openings',
      active: activeTab === 'OPENINGS',
      onClick: () => setActiveTab('OPENINGS'),
      count: openings.length,
    },
    {
      title: 'Upcoming openings',
      active: activeTab === 'UPCOMING',
      onClick: () => setActiveTab('UPCOMING'),
      count: upcomingOpenings.length,
    },
  ]

  return (
    <PageLayout
      header={
        <PageHeader>
          <PageTitle>Working Groups</PageTitle>
          <WorkingGroupsTabs />
        </PageHeader>
      }
      main={
        <MainPanel ref={sideNeighborRef}>
          <Statistics>
            <MyRolesStat />
            <MyStakeStat />
            <MyEarningsStat />
          </Statistics>
          <ContentWithTabs>
            <Tabs tabsSize="xs" tabs={openingsTabs} />
            {activeTab === 'OPENINGS' && <LoadingOpenings isLoading={currentLoading} openings={openings} />}
            {activeTab === 'UPCOMING' && <LoadingOpenings isLoading={upcomingLoading} openings={upcomingOpenings} />}
          </ContentWithTabs>
        </MainPanel>
      }
      sidebar={
        <SidePanel neighbor={sideNeighborRef}>
          <ActivitiesBlock activities={activities} label="Working Groups Activities" />
        </SidePanel>
      }
    />
  )
}
