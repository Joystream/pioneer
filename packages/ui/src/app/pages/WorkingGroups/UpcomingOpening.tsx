import React, { memo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AppPage } from '@/app/components/AppPage'
import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
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
import { Colors } from '@/common/constants/styles'
import { size, spacing } from '@/common/utils/styles'
import { useUpcomingOpening } from '@/working-groups/hooks/useUpcomingOpening'

export const UpcomingOpening = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, opening } = useUpcomingOpening(id)
  const sideNeighborRef = useRef<HTMLDivElement>(null)

  if (isLoading || !opening) {
    return <Loading />
  }

  const ApplicationStatus = memo(() => (
    <ApplicationStatusWrapper>
      <Circle />
      <>
        <h4>The opening hasn't started yet</h4>
        <p>Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</p>
      </>
    </ApplicationStatusWrapper>
  ))

  return (
    <AppPage lastBreadcrumb={opening.title} rowGap="s">
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
      </PageHeader>
      <RowGapBlock gap={24}>
        <Row>
          <BadgeStatus inverted size="l" separated>
            {opening.groupName}
          </BadgeStatus>
          <BadgeStatus inverted size="l" separated>
            Upcoming
          </BadgeStatus>
        </Row>
        <Statistics>
          <TokenValueStat title="Current budget" tooltipText="Lorem ipsum..." value={opening.budget} />
          <DurationStatistics title="Opening Expected duration" value={opening.expectedEnding} />
          <TokenValueStat title="Reward per 3600 blocks" value={opening.reward.payout} />
          <NumericValueStat title="Hiring limit" value={opening.hiringLimit} />
        </Statistics>
        <ContentWithSidepanel>
          <MainPanel ref={sideNeighborRef}>
            <MarkdownPreview markdown={opening.description} />
          </MainPanel>
          <SidePanel neighbor={sideNeighborRef}>
            <ApplicationStatus />
          </SidePanel>
        </ContentWithSidepanel>
      </RowGapBlock>
      <PageFooter>
        <BlockTime block={opening.createdAtBlock} horizontal dateLabel="Hired" />
      </PageFooter>
    </AppPage>
  )
}

const ApplicationStatusWrapper = styled.div`
  text-align: center;

  h4 {
    color: ${Colors.Blue[500]};
    margin: ${spacing(2, 0)};
  }

  p {
    color: ${Colors.Black[500]};
    margin-bottom: ${spacing(2)};
  }

  button {
    display: inline-flex;
  }
`

const Row = styled.div`
  display: flex;
`

const Circle = styled.div`
  border-radius: 50%;
  background-color: ${Colors.Black[50]};
  margin: 0 auto;
  ${size('96px')};
`
