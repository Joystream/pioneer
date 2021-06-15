import React, { memo, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons/Buttons'
import { BellIcon } from '@/common/components/icons/BellIcon'
import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ContentWithSidepanel, MainPanel, PageFooter, RowGapBlock } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { DurationStatistics, Statistics, TokenValueStat } from '@/common/components/statistics'
import { NumericValueStat } from '@/common/components/statistics/NumericValueStat'
import { TextSmall } from '@/common/components/typography'
import { ApplicationStatusWrapper } from '@/working-groups/components/ApplicationStatusWrapper'
import { OpeningIcon } from '@/working-groups/components/OpeningIcon'
import { useUpcomingOpening } from '@/working-groups/hooks/useUpcomingOpening'

export const UpcomingOpening = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, opening } = useUpcomingOpening(id)
  const sideNeighborRef = useRef<HTMLDivElement>(null)

  if (isLoading || !opening) {
    return (
      <PageLayout
        lastBreadcrumb={id}
        main={
          <RowGapBlock gap={24}>
            <ContentWithSidepanel>
              <Loading />
            </ContentWithSidepanel>
          </RowGapBlock>
        }
      />
    )
  }

  const ApplicationStatus = memo(() => (
    <ApplicationStatusWrapper gap={24} align="center">
      <OpeningIcon />
      <RowGapBlock gap={16}>
        <h4>The opening hasn't started yet</h4>
        <TextSmall>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</TextSmall>
      </RowGapBlock>
    </ApplicationStatusWrapper>
  ))

  return (
    <PageLayout
      lastBreadcrumb={opening.title}
      header={
        <PageHeader>
          <PreviousPage>
            <PageTitle>{opening.title}</PageTitle>
          </PreviousPage>
          <ButtonsGroup>
            <ButtonGhost size="medium">
              <BellIcon />
              Notify me when it’s open
            </ButtonGhost>
          </ButtonsGroup>
          <RowGapBlock gap={24}>
            <BadgesRow>
              <BadgeStatus inverted size="l" separated>
                {opening.groupName}
              </BadgeStatus>
              <BadgeStatus inverted size="l" separated>
                Upcoming
              </BadgeStatus>
            </BadgesRow>
            <Statistics>
              <TokenValueStat title="Current budget" tooltipText="Lorem ipsum..." value={opening.budget} />
              <DurationStatistics title="Opening Expected duration" value={opening.expectedEnding} />
              <TokenValueStat title="Reward per 3600 blocks" value={opening.reward.payout} />
              <NumericValueStat title="Hiring limit" value={opening.hiringLimit} />
            </Statistics>
          </RowGapBlock>
        </PageHeader>
      }
      main={
        <MainPanel ref={sideNeighborRef}>
          <MarkdownPreview markdown={opening.description} />
        </MainPanel>
      }
      lowSidebar={
        <SidePanel neighbor={sideNeighborRef}>
          <ApplicationStatus />
        </SidePanel>
      }
      footer={
        <PageFooter>
          <BlockTime block={opening.createdAtBlock} layout="row" dateLabel="Hired" />
        </PageFooter>
      }
    />
  )
}
