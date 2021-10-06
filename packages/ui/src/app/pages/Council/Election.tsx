import React, { useEffect, useMemo } from 'react'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { BlockDurationStatistics, StatisticItem, Statistics } from '@/common/components/statistics'
import { TextHuge } from '@/common/components/typography'
import { camelCaseToText } from '@/common/helpers'
import { useModal } from '@/common/hooks/useModal'
import { useRouteQuery } from '@/common/hooks/useRouteQuery'
import { isNumber } from '@/common/utils'
import { AnnounceCandidacyButton } from '@/council/components/election/announcing/AnnounceCandidacyButton'
import { AnnouncingStage } from '@/council/components/election/announcing/AnnouncingStage'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { useElectionRemainingPeriod } from '@/council/hooks/useElectionRemainingPeriod'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'

import { CouncilTabs } from './components/CouncilTabs'

export const Election = () => {
  const { isLoading: isLoadingElection, election } = useCurrentElection()
  const { isLoading: isLoadingElectionStage, stage: electionStage } = useElectionStage()
  const remainingPeriod = useElectionRemainingPeriod(electionStage)

  const { showModal } = useModal()
  const query = useRouteQuery()
  const candidateId = query.get('candidate')
  const cycle = query.get('cycle')
  useEffect(() => {
    const cycleId = cycle && Number.parseInt(cycle)
    if (candidateId && isNumber(cycleId) && !isNaN(cycleId)) {
      showModal<CandidacyPreviewModalCall>({ modal: 'CandidacyPreview', data: { id: candidateId } })
    }
  }, [candidateId, cycle])

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
        <BlockDurationStatistics title="Period remaining length" tooltipText="Lorem ipsum..." value={remainingPeriod} />
        <StatisticItem title="Election round" tooltipText="Lorem ipsum...">
          <TextHuge bold>{election.cycleId} round</TextHuge>
        </StatisticItem>
      </Statistics>
      {electionStage === 'announcing' && <AnnouncingStage election={election} />}
    </MainPanel>
  )

  return <PageLayout header={header} main={main} />
}
