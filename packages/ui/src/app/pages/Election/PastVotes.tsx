import React from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PastVotesList } from '@/council/components/PastVotes/PastVotesList'
import { PastVotesStats } from '@/council/components/PastVotes/PastVotesStats'

import { ElectionTabs } from './components/ElectionTabs'

export const PastVotes = () => {
  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Elections</PageTitle>
      </PageHeaderRow>
      <ElectionTabs />
    </PageHeaderWrapper>
  )

  const main = (
    <MainPanel>
      <PastVotesStats />
      <PastVotesList />
    </MainPanel>
  )

  return <PageLayout header={header} main={main} />
}
