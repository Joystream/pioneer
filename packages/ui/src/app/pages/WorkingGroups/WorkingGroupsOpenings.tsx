import React, { useRef, useState } from 'react'

import { WorkingGroupOpening } from '@/common/api/queries'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidepanel, ContentWithTabs, MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Statistics } from '@/common/components/statistics'
import { Tabs } from '@/common/components/Tabs'
import { Label, TextBig } from '@/common/components/typography'
import { useActivities } from '@/common/hooks/useActivities'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'
import { MyRolesStat } from '@/working-groups/components/MyRolesStat'
import { MyStakeStat } from '@/working-groups/components/MyStakeStat'
import { OpeningsList, UpcomingOpeningsList } from '@/working-groups/components/OpeningsList'
import { RolesList } from '@/working-groups/components/Roles/RolesList'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useUpcomingOpenings } from '@/working-groups/hooks/useUpcomingOpenings'

import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

type OpeningsTabs = 'OPENINGS' | 'UPCOMING'

export const WorkingGroupsOpenings = () => {
  const { isLoading: currentLoading, openings: currentOpenings } = useOpenings({ type: 'open' })
  const { isLoading: upcomingLoading, upcomingOpenings } = useUpcomingOpenings({})

  const activities = useActivities()
  const sideNeighborRef = useRef<HTMLDivElement>(null)

  const [activeTab, setActiveTab] = useState<OpeningsTabs>('OPENINGS')

  const openingsTabs = [
    {
      title: 'Openings',
      active: activeTab === 'OPENINGS',
      onClick: () => setActiveTab('OPENINGS'),
      count: currentOpenings.length,
    },
    {
      title: 'Upcoming openings',
      active: activeTab === 'UPCOMING',
      onClick: () => setActiveTab('UPCOMING'),
      count: upcomingOpenings.length,
    },
  ]

  const displayOpenings = (type: 'CURRENT' | 'UPCOMING') => {
    if ((type === 'CURRENT' && currentLoading) || (type === 'UPCOMING' && upcomingLoading)) {
      return <Loading />
    }

    if (!(type === 'CURRENT' ? currentOpenings : upcomingOpenings).length) {
      return <TextBig>No {type.toLowerCase()} openings found</TextBig>
    }

    return type === 'CURRENT' ? (
      <OpeningsList openings={currentOpenings} />
    ) : (
      <UpcomingOpeningsList openings={upcomingOpenings} />
    )
  }

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
            <MyStakeStat />
            <MyEarningsStat />
          </Statistics>
          <ContentWithTabs>
            <Tabs tabsSize="xs" tabs={openingsTabs} />
            {activeTab === 'OPENINGS' && displayOpenings('CURRENT')}
            {activeTab === 'UPCOMING' && displayOpenings('UPCOMING')}
          </ContentWithTabs>
        </MainPanel>
        <SidePanel neighbor={sideNeighborRef}>
          <ActivitiesBlock activities={activities} label="Working Groups Activities" />
        </SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}
