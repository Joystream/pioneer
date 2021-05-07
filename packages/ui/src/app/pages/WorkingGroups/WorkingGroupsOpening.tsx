import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AppPage } from '@/app/components/AppPage'
import { BadgeViolet } from '@/common/components/BadgeViolet'
import { ButtonGhost } from '@/common/components/buttons/Buttons'
import { BellIcon } from '@/common/components/icons/BellIcon'
import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ContentWithSidepanel, MainPanel } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { StatisticItem, Statistics, TokenValueStat, DurationStatistics } from '@/common/components/statistics'
import useOpening from '@/working-groups/hooks/useOpening'

const WorkingGroupOpening = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, opening } = useOpening(id)

  if (isLoading || !opening) {
    return <Loading />
  }

  return (
    <AppPage lastBreadcrumb={opening.title}>
      <PageHeader>
        <PreviousPage>
          <PageTitle>{opening.title}</PageTitle>
          <NotificationButton size="small">
            <BellIcon />
            Notify me when it’s open
          </NotificationButton>
        </PreviousPage>
        <Row>
          <BadgeViolet inverted size="l" separated>
            CONTENT
          </BadgeViolet>
          <BadgeViolet inverted size="l" separated>
            {opening.type}
          </BadgeViolet>
          <BadgeViolet inverted size="l" separated>
            UPCOMING OPENING
          </BadgeViolet>
        </Row>
      </PageHeader>
      <MainPanel>
        <Statistics>
          <StatisticItem title="Current budget" helperText="Lorem ipsum...">
            1000
          </StatisticItem>
          <DurationStatistics title="Opening Expected duration" value={opening.expectedEnding} />
          <TokenValueStat title="Reward per 3600 blocks" value={opening.reward.value} />
          <StatisticItem title="Hiring limit">{opening.hiring.total}</StatisticItem>
        </Statistics>
      </MainPanel>
      <ContentWithSidepanel>
        <MarkdownPreview markdown={opening.description} />
      </ContentWithSidepanel>
    </AppPage>
  )
}

const Row = styled.div`
  display: flex;
`
const NotificationButton = styled(ButtonGhost)`
  margin-left: auto;
`

export default WorkingGroupOpening
