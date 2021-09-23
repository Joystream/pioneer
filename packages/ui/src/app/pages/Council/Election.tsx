import React from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { DurationStatistics, StatisticItem, Statistics } from '@/common/components/statistics'
import { NumericValueStat } from '@/common/components/statistics/NumericValueStat'
import { TextHuge } from '@/common/components/typography'
import { camelCaseToText } from '@/common/helpers'
import { AnnounceCandidacyButton } from '@/council/components/election/announcing/AnnounceCandidacyButton'
import { AnnouncingStage } from '@/council/components/election/announcing/AnnouncingStage'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { useElectionStage } from '@/council/hooks/useElectionStage'

import { CouncilTabs } from './components/CouncilTabs'

export const Election = () => {
  const { isLoading: isLoadingElection, election } = useCurrentElection()
  const { isLoading: isLoadingElectionStage, stage: electionStage } = useElectionStage()

  if (isLoadingElection || isLoadingElectionStage) {
    return <PageLayout header={null} main={<Loading />} />
  }

  if (!election || electionStage === 'inactive') {
    return null
  }

  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
        <PageTitle>Election</PageTitle>
        <ButtonsGroup>
          <CopyButtonTemplate size="medium" textToCopy={window.location.href} icon={<LinkIcon />}>
            Copy link
          </CopyButtonTemplate>
          {electionStage === 'announcing' && <AnnounceCandidacyButton />}
        </ButtonsGroup>
      </PageHeaderRow>
      <CouncilTabs />
    </PageHeaderWrapper>
  )

  const main = (
    <MainPanel>
      <Statistics>
        <StatisticItem title="Stage" tooltipText="Lorem ipsum...">
          <TextHuge bold>{camelCaseToText(electionStage)} Period</TextHuge>
        </StatisticItem>
        <DurationStatistics title="Period length" tooltipText="Lorem ipsum..." value={new Date().toISOString()} />
        <StatisticItem title="Election roundd" tooltipText="Lorem ipsum...">
          <TextHuge bold>{election.cycleId} round</TextHuge>
        </StatisticItem>
      </Statistics>
      {electionStage === 'announcing' && <AnnouncingStage election={election} />}
    </MainPanel>
  )

  return <PageLayout header={header} main={main} />
}
