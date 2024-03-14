import React from 'react'
import styled from 'styled-components'

import { PageHeaderWithButtons, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { LinkIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { StatisticItem, Statistics } from '@/common/components/statistics'
import { TextHuge } from '@/common/components/typography'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { useResponsive } from '@/common/hooks/useResponsive'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { getUrl } from '@/common/utils/getUrl'
import { AnnounceCandidacyButton } from '@/council/components/election/announcing/AnnounceCandidacyButton'
import { AnnouncingStage } from '@/council/components/election/announcing/AnnouncingStage'
import { BackupVotesButton } from '@/council/components/election/BackupVotesButton'
import { RestoreVotesButton } from '@/council/components/election/RestoreVotesButton'
import { RevealingStage } from '@/council/components/election/revealing/RevealingStage'
import { VotingStage } from '@/council/components/election/voting/VotingStage'
import { ElectionRoutes } from '@/council/constants'
import { useCandidatePreviewViaUrlParameter } from '@/council/hooks/useCandidatePreviewViaUrlParameter'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { ElectionStage, Election as ElectionType } from '@/council/types/Election'

import { ElectionProgressBar } from './components/ElectionProgressBar'
import { ElectionTabs } from './components/ElectionTabs'

const displayElectionRound = (election: ElectionType | undefined): string => {
  if (!election) {
    return '-'
  }

  return String(election.cycleId)
}

export const Election = () => {
  const { size } = useResponsive()
  const { isLoading: isLoadingElection, election } = useCurrentElection()

  const { isLoading: isLoadingElectionStage, stage: electionStage } = useElectionStage()
  useCandidatePreviewViaUrlParameter()

  useRefetchQueries({ after: electionStage === 'announcing' }, [electionStage])
  const isRefetched = useRefetchQueries(
    { when: electionStage === 'announcing', interval: MILLISECONDS_PER_BLOCK, include: ['GetCurrentElection'] },
    [electionStage]
  )

  if (isLoadingElectionStage) {
    return <PageLayout header={null} main={<Loading />} />
  }

  const header = (
    <PageHeaderWrapper>
      <PageHeaderWithButtons>
        <PageTitle>Elections</PageTitle>
        <ButtonsGroup>
          <CopyButtonTemplate
            size="medium"
            textToCopy={getUrl({ route: ElectionRoutes.currentElection })}
            icon={<LinkIcon />}
          >
            Copy link
          </CopyButtonTemplate>
          {electionStage === 'announcing' && <AnnounceCandidacyButton />}
          {(electionStage === 'voting' || electionStage === 'revealing') && (
            <>
              <BackupVotesButton cycleId={election?.cycleId} />
              <RestoreVotesButton cycleId={election?.cycleId} />
            </>
          )}
        </ButtonsGroup>
      </PageHeaderWithButtons>
      <ElectionTabs />
    </PageHeaderWrapper>
  )

  const main = (
    <MainPanel>
      <StyledStatistics size={size} stage={electionStage}>
        {electionStage !== 'inactive' && (
          <StatisticItem
            title="Round"
            tooltipText="Elections are held in consecutive rounds. This is the number of current election."
          >
            <TextHuge id="election-round-value" bold>
              {displayElectionRound(election)}
            </TextHuge>
          </StatisticItem>
        )}
        <ElectionProgressBar
          electionStage={electionStage}
          title="Election Progress"
          tooltipText="Elections occur periodically. Each has a sequence of stages referred to as the election cycle. Stages are: announcing period, voting period and revealing period."
        />
      </StyledStatistics>
      {electionStage === 'inactive' && (
        <EmptyPagePlaceholder title="There are no ongoing elections" copy="" button={null} />
      )}
      {electionStage === 'announcing' && (
        <AnnouncingStage election={election} isLoading={!isRefetched && isLoadingElection} />
      )}
      {electionStage === 'voting' && <VotingStage election={election} isLoading={isLoadingElection} />}
      {electionStage === 'revealing' && <RevealingStage election={election} isLoading={isLoadingElection} />}
    </MainPanel>
  )

  return <PageLayout header={header} main={main} />
}

const StyledStatistics = styled(Statistics)<{ size: string; stage: ElectionStage }>`
  grid-template-columns: ${({ size, stage }) =>
    stage === 'inactive' || size === 'xxs' || size === 'xs' ? '1fr' : '200px 1fr'};
`
