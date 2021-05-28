import BN from 'bn.js'
import React, { useRef, useState } from 'react'

import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidepanel, ContentWithTabs, MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { MultiTokenValueStat, Statistics } from '@/common/components/statistics'
import { Tabs } from '@/common/components/Tabs'
import { useActivities } from '@/common/hooks/useActivities'
import { MyRolesStat } from '@/working-groups/components/MyRolesStat'
import { MyStake } from '@/working-groups/components/MyStake'
import { OpeningsList, UpcomingOpeningsList } from '@/working-groups/components/OpeningsList'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useUpcomingOpenings } from '@/working-groups/hooks/useUpcomingOpenings'

import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

type OpeningsTabs = 'OPENINGS' | 'UPCOMING'

export const WorkingGroupsOpenings = () => {
  const { isLoading, openings } = useOpenings({ type: 'open' })
  const { isLoading: upcomingLoading, upcomingOpenings } = useUpcomingOpenings({})
  const activities = useActivities()

  const earnings = {
    day: new BN(200),
    month: new BN(102_000),
  }

  const [activeTab, setActiveTab] = useState<OpeningsTabs>('OPENINGS')

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
  const sideNeighborRef = useRef<HTMLDivElement>(null)
  return (
    <AppPage>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs />
      </PageHeader>
      <ContentWithSidepanel>
        <MainPanel ref={sideNeighborRef}>
          <Statistics>
            <MyRolesStat />
            <MyStake />
            <MultiTokenValueStat
              title="Earned in past"
              values={[
                { label: '24 hours', value: earnings.day },
                { label: 'Month', value: earnings.month },
              ]}
            />
          </Statistics>
          <ContentWithTabs>
            <Tabs tabsSize="xs" tabs={openingsTabs} />
            {activeTab === 'OPENINGS' && (isLoading ? <Loading /> : <OpeningsList openings={openings} />)}
            {activeTab === 'UPCOMING' &&
              (upcomingLoading ? <Loading /> : <UpcomingOpeningsList openings={upcomingOpenings} />)}
          </ContentWithTabs>
        </MainPanel>
        <SidePanel neighbor={sideNeighborRef}>
          <ActivitiesBlock activities={activities} label="Working Groups Activities" />
        </SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}
