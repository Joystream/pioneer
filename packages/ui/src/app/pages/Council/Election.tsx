import React from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ButtonPrimary, ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { DurationStatistics, StatisticItem, Statistics } from '@/common/components/statistics'
import { NumericValueStat } from '@/common/components/statistics/NumericValueStat'
import { TextHuge } from '@/common/components/typography'
import { camelCaseToText } from '@/common/helpers'
import { AnnounceCandidacyButton } from '@/council/components/election/announcing/AnnounceCandidacyButton'
import { AnnouncingStage } from '@/council/components/election/announcing/AnnouncingStage'
import { useElectionStage } from '@/council/hooks/useElectionStage'

import { CouncilTabs } from './components/CouncilTabs'

export const Election = () => {
  const electionStage = useElectionStage()

  if (electionStage === 'inactive') {
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
        <NumericValueStat title="Election round" tooltipText="Lorem ipsum..." value={1} />
      </Statistics>
      {electionStage === 'announcing' && <AnnouncingStage />}
    </MainPanel>
  )

  return <PageLayout header={header} main={main} />
}
