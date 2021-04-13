import React, { useState } from 'react'
import styled from 'styled-components'

import { PageHeader } from '../../../common/components/page/PageHeader'
import { PageTitle } from '../../../common/components/page/PageTitle'
import { PreviousPage } from '../../../common/components/page/PreviousPage'
import { Tabs } from '../../../common/components/Tabs'
import { AppPage } from '../../components/AppPage'

import { OpeningsTab } from './OpeningsTab'

type Tab = 'OPENINGS' | 'ABOUT' | 'HISTORY'

export function WorkingGroup() {
  const [currentTab, setCurrentTab] = useState<Tab>('OPENINGS')

  const crumbs = [
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Working Groups' },
    { href: '#', text: 'Storage' },
  ]

  const tabs = [
    { title: 'Openings', active: currentTab === 'OPENINGS', onClick: () => setCurrentTab('OPENINGS') },
    { title: 'About', active: currentTab === 'ABOUT', onClick: () => setCurrentTab('ABOUT') },
    { title: 'History', active: false, onClick: () => undefined },
  ]

  return (
    <AppPage crumbs={crumbs}>
      <PageHeader>
        <PreviousPage>
          <PageTitle>Storage</PageTitle>
        </PreviousPage>
        <Tabs tabs={tabs} />
      </PageHeader>
      {currentTab === 'OPENINGS' ? <OpeningsTab /> : <></>}
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
