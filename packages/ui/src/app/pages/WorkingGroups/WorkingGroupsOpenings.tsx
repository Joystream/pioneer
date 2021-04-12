import React, { useMemo, useState } from 'react'

import { Activities, Activity } from '../../../common/components/Activities'
import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../common/components/page/PageContent'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { Statistics } from '../../../common/components/statistics/Stats'
import { Tabs } from '../../../common/components/Tabs'
import { Label } from '../../../common/components/typography'
import { OpeningsList } from '../../../working-groups/components/OpeningsList'
import { useOpenings } from '../../../working-groups/hooks/useWorkingGroups'
import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

type OpeningsTabs = 'OPENINGS' | 'UPCOMING'

const useActivities = (): Activity[] => [
  {
    id: '1',
    time: '2021-03-09T10:28:04.155Z',
    text: 'Opening "Became a Forum Moderator has been closed by the Working Group Leader',
    type: 'up',
  },
  {
    id: '2',
    time: '2021-03-09T10:28:04.155Z',
    text: 'Jennifer_123 has been hired as a Storage Working Group Leader',
    type: 'down',
  },
  {
    id: '3',
    time: '2021-03-09T10:28:04.155Z',
    text: 'Jennifer_123 has been hired as a Storage Working Group Leader',
    type: 'up',
    variant: 'error',
  },
  {
    id: '4',
    time: '2021-03-09T10:28:04.155Z',
    text: 'Jennifer_123 has been hired as a Storage Working Group Leader',
    type: 'down',
    variant: 'ok',
  },
  {
    id: '5',
    time: '2021-03-09T10:28:04.155Z',
    text: 'Opening "Became a Forum Moderator has been closed by the Working Group Leader',
    type: 'up',
  },
  {
    id: '6',
    time: '2021-03-09T10:28:04.155Z',
    text: 'Jennifer_123 has been hired as a Storage Working Group Leader',
    type: 'down',
  },
  {
    id: '7',
    time: '2021-03-09T10:28:04.155Z',
    text: 'Jennifer_123 has been hired as a Storage Working Group Leader',
    type: 'up',
    variant: 'error',
  },
  {
    id: '8',
    time: '2021-03-09T10:28:04.155Z',
    text: 'Jennifer_123 has been hired as a Storage Working Group Leader',
    type: 'down',
    variant: 'ok',
  },
]

export const WorkingGroupsOpenings = () => {
  const openings = useOpenings()
  const upcomingOpenings = openings.slice(0, 1)
  const activities = useActivities()

  const crumbs = useMemo(
    () => [
      { href: '#', text: 'Working Groups' },
      { href: '#', text: 'Openings' },
    ],
    []
  )
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

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PageTitle>Working Groups</PageTitle>
        <WorkingGroupsTabs />
      </PageHeader>
      <ContentWithSidepanel>
        <MainPanel>
          <Statistics
            stats={[
              {
                title: 'MyRoles',
                value: 5,
              },
              {
                title: 'Currently staking',
                value: 5,
              },
              {
                title: 'Earned in past',
                value: 5,
              },
            ]}
          />
          <Tabs tabsSize="xs" tabs={openingsTabs} />
          <OpeningsList openings={activeTab === 'OPENINGS' ? openings : upcomingOpenings} />
        </MainPanel>
        <SidePanel>
          <Label>Working group activities</Label>
          <Activities activities={activities} />
        </SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}
