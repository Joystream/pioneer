import React, { useState } from 'react'
import { css } from 'styled-components'

import { PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { ContentWithTabs, MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Statistics } from '@/common/components/statistics'
import { Tabs } from '@/common/components/Tabs'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'
import { MyRolesStat } from '@/working-groups/components/MyRolesStat'
import { MyStakeStat } from '@/working-groups/components/MyStakeStat'
import { LoadingOpenings } from '@/working-groups/components/OpeningsList'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useOpeningsActivities } from '@/working-groups/hooks/useOpeningsActivities'
import { useUpcomingOpenings } from '@/working-groups/hooks/useUpcomingOpenings'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

type OpeningsTabs = 'OPENINGS' | 'UPCOMING'

export const WorkingGroupsOpenings = () => {
  const { isLoading: upcomingLoading, upcomingOpenings } = useUpcomingOpenings({})
  const { isLoading: currentLoading, openings } = useOpenings({ type: 'open' })
  const { activities } = useOpeningsActivities()
  const [activeTab, setActiveTab] = useState<OpeningsTabs>('OPENINGS')

  const isRefetched = useRefetchQueries(
    {
      interval: MILLISECONDS_PER_BLOCK,
      include: activeTab === 'OPENINGS' ? ['GetWorkingGroupOpenings'] : ['GetUpcomingWorkingGroupOpenings'],
    },
    [activeTab]
  )

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
        <PageHeaderWrapper>
          <PageTitle>Working Groups</PageTitle>
          <WorkingGroupsTabs />
        </PageHeaderWrapper>
      }
      main={
        <MainPanel>
          <Statistics>
            <MyRolesStat />
            <MyStakeStat />
            <MyEarningsStat />
          </Statistics>
          <ContentWithTabs>
            <Tabs tabsSize="xs" tabs={openingsTabs} />
            {activeTab === 'OPENINGS' && (
              <LoadingOpenings isLoading={!isRefetched && currentLoading} openings={openings} />
            )}
            {activeTab === 'UPCOMING' && (
              <LoadingOpenings isLoading={!isRefetched && upcomingLoading} openings={upcomingOpenings} />
            )}
          </ContentWithTabs>
        </MainPanel>
      }
      sidebar={
        <SidePanel>
          <ActivitiesBlock activities={activities} label="Working Groups Activities" />
        </SidePanel>
      }
      responsiveStyle={ResponsiveStyle}
    />
  )
}

const ResponsiveStyle = css`
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'header'
    'main'
    'sidebar';

  aside {
    position: relative;
    width: 100%;
    grid-area: sidebar;

    > div {
      position: relative;
      width: 100%;
      max-width: 100%;
      height: 100%;
    }
  }

  @media (min-width: 1440px) {
    grid-template-columns: 9fr 3fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'header header'
      'main sidebar';

    aside {
      position: absolute;
      top: 0;
      bottom: 0;
      padding-left: 16px;

      > div {
        min-height: 184px;
        overflow: hidden;
      }
    }
  }
`
