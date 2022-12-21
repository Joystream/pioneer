import React, { memo } from 'react'
import { useParams } from 'react-router-dom'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons/Buttons'
import { BellIcon } from '@/common/components/icons/BellIcon'
import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ContentWithSidePanel, MainPanel, PageFooter, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { DurationStatistics, Statistics, TokenValueStat } from '@/common/components/statistics'
import { NumericValueStat } from '@/common/components/statistics/NumericValueStat'
import { TextSmall } from '@/common/components/typography'
import { ApplicationStatusWrapper } from '@/working-groups/components/ApplicationStatusWrapper'
import { OpeningIcon } from '@/working-groups/components/OpeningIcon'
import { useRewardPeriod } from '@/working-groups/hooks/useRewardPeriod'
import { useUpcomingOpening } from '@/working-groups/hooks/useUpcomingOpening'

export const UpcomingOpening = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, opening } = useUpcomingOpening(id)
  const rewardPeriod = useRewardPeriod(opening?.groupId)

  if (isLoading || !opening) {
    return (
      <PageLayout
        lastBreadcrumb={id}
        main={
          <RowGapBlock gap={24}>
            <ContentWithSidePanel>
              <Loading />
            </ContentWithSidePanel>
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
        <TextSmall>This opening becomes available for applications when at the set block.</TextSmall>
      </RowGapBlock>
    </ApplicationStatusWrapper>
  ))

  return (
    <PageLayout
      lastBreadcrumb={opening.title}
      header={
        <PageHeaderWrapper>
          <PageHeaderRow>
            <PreviousPage>
              <PageTitle>{opening.title}</PageTitle>
            </PreviousPage>
            <ButtonsGroup>
              <ButtonGhost size="medium">
                <BellIcon />
                Notify me when it’s open
              </ButtonGhost>
            </ButtonsGroup>
          </PageHeaderRow>
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
              <DurationStatistics title="Time to begin" value={opening.expectedStart} />
              <DurationStatistics
                title="Opening Expected duration"
                value={opening.expectedEnding}
                from={opening.expectedStart}
              />
              <TokenValueStat
                title={`Reward per ${rewardPeriod?.toString()} blocks`}
                value={rewardPeriod?.mul(opening.rewardPerBlock)}
              />
              {opening.hiringLimit ? (
                <NumericValueStat title="Hiring limit" value={opening.hiringLimit} />
              ) : (
                <TokenValueStat title="Minimal Stake" value={opening.stake} />
              )}
            </Statistics>
          </RowGapBlock>
        </PageHeaderWrapper>
      }
      main={
        <MainPanel>
          <MarkdownPreview markdown={opening.description} />
        </MainPanel>
      }
      sidebar={
        <SidePanel scrollable>
          <ApplicationStatus />
        </SidePanel>
      }
      footer={
        <PageFooter>
          <BlockTime block={opening.createdAtBlock} layout="row" dateLabel="Created" />
        </PageFooter>
      }
    />
  )
}
