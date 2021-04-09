import React from 'react'
import styled from 'styled-components'

import { ContentWithSidepanel, SidePanel } from '../../../common/components/page/PageContent'
import { Statistics } from '../../../common/components/statistics/Stats'
import { Label } from '../../../common/components/typography'
import { BorderRad, Colors, Transitions } from '../../../common/constants'
import { AppPage } from '../../components/AppPage'

export function WorkingGroup() {
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
            <OpeningsList>
              <OpeningItem />
            </OpeningsList>
          </OpeningsCategory>
          <OpeningsCategory>
            <Label>Openings</Label>
            <OpeningsList>
              <OpeningItem />
            </OpeningsList>
          </OpeningsCategory>
        </OpeningsCategories>
        <SidePanel>Some content</SidePanel>
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

export const OpeningsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const OpeningItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 16px;
  grid-column-gap: 24px;
  padding: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
  transition: ${Transitions.all};

  & + & {
    margin-top: -1px;
  }
`
