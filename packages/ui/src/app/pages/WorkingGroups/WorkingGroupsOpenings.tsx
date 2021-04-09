import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../common/components/page/PageContent'
import { Statistics } from '../../../common/components/statistics/Stats'
import { Tabs } from '../../../common/components/Tabs'
import { OpeningsList } from '../../../working-groups/components/OpeningsList'
import { useOpenings } from '../../../working-groups/hooks/useWorkingGroups'
import { AppPage } from '../../components/AppPage'

type OpeningsTabs = 'OPENINGS' | 'UPCOMING'

export const WorkingGroupsOpenings = () => {
  const history = useHistory()
  const openings = useOpenings()
  const upcomingOpenings = openings.slice(0, 1)

  const tabs = [
    { title: 'Openings', active: true, onClick: () => history.push('/working-groups') },
    { title: 'Working Groups', active: false, onClick: () => history.push('/working-groups/working-groups') },
  ]

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
    <AppPage pageTitle="Working Groups" crumbs={crumbs} tabs={tabs}>
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
