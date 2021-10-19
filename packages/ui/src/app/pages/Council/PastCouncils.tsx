import React from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { NotFoundText } from '@/common/components/typography/NotFoundText'

import { CouncilTabs } from './components/CouncilTabs'

export const PastCouncils = () => {
  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Council</PageTitle>
      </PageHeaderRow>
      <CouncilTabs />
    </PageHeaderWrapper>
  )

  const main = (
    <MainPanel>
      <NotFoundText>There are no past councils</NotFoundText>
    </MainPanel>
  )

  return <PageLayout header={header} main={main} />
}
