import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { ContentWithSidepanel, SidePanel } from '../../../common/components/page/PageContent'
import { Statistics } from '../../../common/components/statistics/Stats'
import { Label } from '../../../common/components/typography'
import { OpeningsList, WorkingGroupOpening } from '../../../working-groups/components/OpeningsList'
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

  const openings: WorkingGroupOpening[] = [
    {
      id: '123',
      title: 'Storage working group leader',
      duration: [123, 'days'],
      type: 'LEADER',
      reward: { value: new BN(1000), interval: 3600 },
      applicants: { current: 2, total: 10 },
      hiring: { current: 0, total: 1 },
    },
    {
      id: '221',
      title: 'Storage working group worker',
      duration: [12, 'days'],
      type: 'LEADER',
      reward: { value: new BN(1000), interval: 3600 },
      applicants: { current: 2, total: 10 },
      hiring: { current: 0, total: 1 },
    },
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
            <OpeningsList openings={openings} />
          </OpeningsCategory>
          <OpeningsCategory>
            <Label>Openings</Label>
            <OpeningsList openings={openings} />
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
