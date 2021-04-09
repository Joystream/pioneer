import React from 'react'
import styled from 'styled-components'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../common/components/page/PageContent'
import { Statistics } from '../../../common/components/statistics/Stats'
import { Label } from '../../../common/components/typography'
import { OpeningsList } from '../../../working-groups/components/OpeningsList'
import { useOpenings } from '../../../working-groups/hooks/useWorkingGroups'
import { AppPage } from '../../components/AppPage'

export function WorkingGroup() {
  const openings = useOpenings()

  const crumbs = [
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Storage' },
  ]

  const tabs = [
    { title: 'Openings', active: true, onClick: () => undefined },
    { title: 'About', active: false, onClick: () => undefined },
    { title: 'History', active: false, onClick: () => undefined },
  ]

  return (
    <AppPage pageTitle="Storage" crumbs={crumbs} tabs={tabs}>
      <ContentWithSidepanel>
        <MainPanel>
          <Statistics
            stats={[
              { title: 'Current budget', helperText: 'Lorem fishy', value: 150200 },
              { title: 'Working Group Debt', helperText: 'Lorem fishy', value: -200 },
              { title: 'Avg Stake', helperText: 'Lorem fishy', value: 100000 },
            ]}
          />
          <OpeningsCategories>
            <OpeningsCategory>
              <Label>Upcoming openings</Label>
              <OpeningsList openings={openings} />
            </OpeningsCategory>
            <OpeningsCategory>
              <Label>Openings</Label>
              <OpeningsList openings={openings} />
            </OpeningsCategory>
          </OpeningsCategories>
        </MainPanel>
        <SidePanel>Activities</SidePanel>
      </ContentWithSidepanel>
    </AppPage>
  )
}

export const OpeningsCategories = styled.div`
  display: grid;
  grid-row-gap: 24px;
  width: 100%;
`

export const OpeningsCategory = styled.div`
  display: grid;
  grid-row-gap: 16px;
  width: 100%;
`
