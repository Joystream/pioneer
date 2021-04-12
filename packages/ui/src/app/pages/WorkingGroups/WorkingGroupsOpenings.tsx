import React, { useState } from 'react'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../common/components/page/PageContent'
import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { Statistics } from '../../../common/components/statistics/Stats'
import { Tabs } from '../../../common/components/Tabs'
import { OpeningsList } from '../../../working-groups/components/OpeningsList'
import { useOpenings } from '../../../working-groups/hooks/useWorkingGroups'
import { AppPage } from '../../components/AppPage'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

type OpeningsTabs = 'OPENINGS' | 'UPCOMING'

export const WorkingGroupsOpenings = () => {
  const openings = useOpenings()
  const upcomingOpenings = openings.slice(0, 1)

  const crumbs = [
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Openings' },
  ]

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
        <WorkingGroupsTabs active="Openings" />
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
        <SidePanel>Activities</SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}
