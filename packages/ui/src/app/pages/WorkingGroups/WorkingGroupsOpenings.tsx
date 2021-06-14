import React, { useRef, useState } from 'react'

import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { ContentWithSidepanel, ContentWithTabs, MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Pagination } from '@/common/components/Pagination'
import { Statistics } from '@/common/components/statistics'
import { Tabs } from '@/common/components/Tabs'
import { useActivities } from '@/common/hooks/useActivities'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'
import { MyRolesStat } from '@/working-groups/components/MyRolesStat'
import { MyStakeStat } from '@/working-groups/components/MyStakeStat'
import { LoadingOpenings, OpeningsList } from '@/working-groups/components/OpeningsList'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useUpcomingOpenings } from '@/working-groups/hooks/useUpcomingOpenings'

import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

type OpeningsTabs = 'OPENINGS' | 'UPCOMING'

export const WorkingGroupsOpenings = () => {
  const [page, setPage] = useState(1)
  const { isLoading: currentLoading, openings: currentOpenings, pageCount } = useOpenings({ statusIn: ['open'], page })
  const { isLoading: upcomingLoading, upcomingOpenings } = useUpcomingOpenings({})
  const activities = useActivities()
  const [activeTab, setActiveTab] = useState<OpeningsTabs>('OPENINGS')
  const sideNeighborRef = useRef<HTMLDivElement>(null)

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
            {activeTab === 'OPENINGS' && (
              <>
                <OpeningsList isLoading={currentLoading} openings={currentOpenings} />
                <Pagination page={page} pageCount={pageCount} handlePageChange={setPage} />
              </>
            )}
            {activeTab === 'UPCOMING' && <LoadingOpenings isLoading={upcomingLoading} openings={upcomingOpenings} />}
          </ContentWithTabs>
        </MainPanel>
        <SidePanel neighbor={sideNeighborRef}>
          <ActivitiesBlock activities={activities} label="Working Groups Activities" />
        </SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}
