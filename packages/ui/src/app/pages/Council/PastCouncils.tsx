import React from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { CouncilsList } from '@/app/pages/Council/components/CouncilsList'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
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
      <CouncilsList isLoading={isLoading} councils={councils} />
    </MainPanel>
  )

  return <PageLayout header={header} main={main} />
}
