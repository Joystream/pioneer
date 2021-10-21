import React from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PastCouncilsList } from '@/council/components/PastCouncilsList'
import { usePastCouncils } from '@/council/hooks/usePastCouncils'

import { CouncilTabs } from './components/CouncilTabs'

export const PastCouncils = () => {
  const { isLoading, councils } = usePastCouncils()

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
      <PastCouncilsList isLoading={isLoading} councils={councils} />
    </MainPanel>
  )

  return <PageLayout header={header} main={main} />
}
