import React from 'react'
import { useHistory } from 'react-router-dom'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../common/components/page/PageContent'
import { Statistics } from '../../../common/components/statistics/Stats'
import { OpeningsList } from '../../../working-groups/components/OpeningsList'
import { useOpenings } from '../../../working-groups/hooks/useWorkingGroups'
import { AppPage } from '../../components/AppPage'

export const WorkingGroupsOpenings = () => {
  const history = useHistory()
  const openings = useOpenings()

  const tabs = [
    { title: 'Openings', active: true, onClick: () => history.push('/working-groups') },
    { title: 'Working Groups', active: false, onClick: () => history.push('/working-groups/working-groups') },
  ]

  const crumbs = [
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Openings' },
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
          <OpeningsList openings={openings} />
        </MainPanel>
        <SidePanel>Activities</SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}
