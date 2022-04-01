import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { Loading } from '@/common/components/Loading'
import { MainPanel } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { BlockDurationStatistics, StatisticItem, Statistics } from '@/common/components/statistics'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { camelCaseToText } from '@/common/helpers'
import { useRefetch } from '@/common/hooks/useRefetch'
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
import { useElectionRemainingPeriod } from '@/council/hooks/useElectionRemainingPeriod'
import { useElectionStage } from '@/council/hooks/useElectionStage'
import { Election as ElectionType } from '@/council/types/Election'

import { ElectionTabs } from './components/ElectionTabs'

const displayElectionRound = (election: ElectionType | undefined): string => {
  if (!election) {
    return '-'
  }

  return String(election.cycleId)
}

export const Election = () => {
  const { isLoading: isLoadingElection, election, refetch: refetchElection } = useCurrentElection()
  useRefetch({ type: 'set', payload: refetchElection })

  const { isLoading: isLoadingElectionStage, stage: electionStage } = useElectionStage()
  const remainingPeriod = useElectionRemainingPeriod(electionStage)
  const history = useHistory()
  useCandidatePreviewViaUrlParameter()

  useEffect(() => {
    if (!isLoadingElectionStage && electionStage === 'inactive') {
      history.replace(ElectionRoutes.pastElections)
    }
  }, [electionStage])

  if (isLoadingElectionStage) {
    return <PageLayout header={null} main={<Loading />} />
  }

  const header = (
    <PageHeaderWrapper>
      <PageHeaderRow>
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
      </PageHeaderRow>
      <ElectionTabs />
    </PageHeaderWrapper>
  )

  const main = (
    <MainPanel>
      <Statistics>
        <StatisticItem
          title="Stage"
          tooltipText={
            <>
              Elections occur periodically, and each one has a sequence of stages referred to as the election cycle.
              Stages are: announcing period, voting period and revealing period.{' '}
              <TooltipExternalLink
                href="https://joystream.gitbook.io/joystream-handbook/governance/council#election"
                target="_blank"
              >
                <TextMedium>More details</TextMedium> <LinkSymbol />
              </TooltipExternalLink>
            </>
          }
        >
          <TextHuge bold>{camelCaseToText(electionStage)} Period</TextHuge>
        </StatisticItem>
        <BlockDurationStatistics
          title="Period remaining length"
          tooltipText={
            <>
              Remaining length of current period before the next one starts.{' '}
              <TooltipExternalLink
                href="https://joystream.gitbook.io/joystream-handbook/governance/council#election"
                target="_blank"
              >
                <TextMedium>Link</TextMedium> <LinkSymbol />
              </TooltipExternalLink>
            </>
          }
          value={remainingPeriod}
        />
        <StatisticItem
          title="Election round"
          tooltipText="Elections are held in consecutive rounds. This is the number of current election."
        >
          <TextHuge id="election-round-value" bold>
            {displayElectionRound(election)}
          </TextHuge>
        </StatisticItem>
      </Statistics>
      {electionStage === 'announcing' && <AnnouncingStage election={election} isLoading={isLoadingElection} />}
      {electionStage === 'voting' && <VotingStage election={election} isLoading={isLoadingElection} />}
      {electionStage === 'revealing' && <RevealingStage election={election} isLoading={isLoadingElection} />}
    </MainPanel>
  )

  return <PageLayout header={header} main={main} />
}
