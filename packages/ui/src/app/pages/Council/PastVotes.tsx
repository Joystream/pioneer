import React from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'

import { CouncilTabs } from './components/CouncilTabs'

export const PastVotes = () => {
  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Council</PageTitle>
      </PageHeaderRow>
      <CouncilTabs />
    </PageHeaderWrapper>
  )

  const main = <MainPanel></MainPanel>

  return <PageLayout header={header} main={main} />
}
