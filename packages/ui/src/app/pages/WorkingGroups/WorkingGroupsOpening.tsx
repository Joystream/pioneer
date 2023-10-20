import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockTime } from '@/common/components/BlockTime'
import { CopyButtonTemplate } from '@/common/components/buttons'
import { ButtonsGroup } from '@/common/components/buttons/Buttons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ContentWithSidePanel, MainPanel, PageFooter, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import {
  DurationStatistics,
  FractionValue,
  MultiColumnsStatistic,
  NumericValue,
  StatiscticContentColumn,
  StatisticHeader,
  Statistics,
  StatsBlock,
  TokenValueStat,
} from '@/common/components/statistics'
import { TextSmall } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { getUrl } from '@/common/utils/getUrl'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { ApplicantsList } from '@/working-groups/components/ApplicantsList'
import { ApplicationStatusWrapper } from '@/working-groups/components/ApplicationStatusWrapper'
import { OpeningIcon } from '@/working-groups/components/OpeningIcon'
import { MappedStatuses, OpeningStatuses, WorkingGroupsRoutes } from '@/working-groups/constants'
import { useOpening } from '@/working-groups/hooks/useOpening'
import { useRewardPeriod } from '@/working-groups/hooks/useRewardPeriod'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { urlParamToOpeningId } from '@/working-groups/model/workingGroupName'
import { WorkingGroupOpening as WorkingGroupOpeningType } from '@/working-groups/types'

export const WorkingGroupOpening = () => {
  const { id } = useParams<{ id: string }>()
  const { showModal } = useModal()
  const { active: activeMembership } = useMyMemberships()
  const { isLoading, opening } = useOpening(urlParamToOpeningId(id))

  const activeApplications = useMemo(() => {
    if (opening) {
      return opening.applications?.filter((application) => application.status !== 'ApplicationStatusWithdrawn')
    }
  }, [opening?.applications])

  const hiredApplicants = useMemo(() => {
    if (activeApplications) {
      return activeApplications.filter(({ status }) => status === 'ApplicationStatusAccepted')
    }
  }, [opening?.id])
  const myApplication = useMemo(() => {
    if (activeApplications) {
      return activeApplications.find(({ id }) => id === activeMembership?.id)
    }
  }, [opening?.id, activeMembership?.id])
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

  const StatusBadge = memo(() => {
    const { status } = opening
    const label = MappedStatuses[opening.status]
    return status === OpeningStatuses.CANCELLED ? (
      <BadgeStatus ended inverted size="l" separated>
        {label}
      </BadgeStatus>
    ) : (
      <BadgeStatus inverted size="l" separated>
        {label}
      </BadgeStatus>
    )
  })

  const ApplyButton = memo(() => (
    <TransactionButton
      style="primary"
      size="medium"
      onClick={() => showModal<ApplyForRoleModalCall>({ modal: 'ApplyForRoleModal', data: { opening } })}
    >
      Apply now!
    </TransactionButton>
  ))

  const ApplicationStatus = memo(() => (
    <ApplicationStatusWrapper gap={24} align="center">
      <OpeningIcon />
      {opening.status === OpeningStatuses.OPEN && (
        <RowGapBlock gap={16}>
          <h4>No applicants yet</h4>
          <TextSmall>Be the first one to apply.</TextSmall>
        </RowGapBlock>
      )}
      {opening.status === OpeningStatuses.OPEN && <ApplyButton />}
    </ApplicationStatusWrapper>
  ))

  return (
    <PageLayout
      lastBreadcrumb={opening.title}
      header={
        <PageHeaderWrapper>
          <PageHeaderRow>
            <PreviousPage customLink={WorkingGroupsRoutes.openings}>
              <PageTitle>{opening.title}</PageTitle>
            </PreviousPage>
            <ButtonsGroup>
              {(opening.status === OpeningStatuses.OPEN || opening.status === OpeningStatuses.CANCELLED) && (
                <CopyButtonTemplate
                  size="medium"
                  textToCopy={getUrl({ route: WorkingGroupsRoutes.openingById, params: { id: opening.id } })}
                  icon={<LinkIcon />}
                >
                  Copy link
                </CopyButtonTemplate>
              )}
              {opening.status === OpeningStatuses.OPEN && <ApplyButton />}
            </ButtonsGroup>
          </PageHeaderRow>
          <RowGapBlock gap={24}>
            <BadgesRow>
              <BadgeStatus inverted size="l" separated>
                {opening.groupName}
              </BadgeStatus>
              <BadgeStatus inverted size="l" separated>
                {opening.type}
              </BadgeStatus>
              <StatusBadge />
            </BadgesRow>
            <Statistics>
              <DurationStatistics title="Time Left" value={opening.expectedEnding} />
              <TokenValueStat
                title={`Reward per ${rewardPeriod?.toString()} blocks`}
                value={rewardPeriod?.mul(opening.rewardPerBlock)}
              />
              <TokenValueStat
                title="Minimal stake"
                tooltipText="Minimum tokens free of rivalrous locks required as application stake to this role."
                tooltipLinkText="Learn more"
                tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/working-groups#staking"
                value={opening.stake}
              />
              <ApplicationStats
                applicants={opening.applications?.length ?? 0}
                hiring={opening.hiring}
                status={opening.status}
              />
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
          <ApplicantsList
            allApplicants={opening.applications}
            myApplication={myApplication}
            hired={hiredApplicants}
            hiringComplete={opening.status !== OpeningStatuses.OPEN}
          />
          {opening.status === OpeningStatuses.OPEN && !activeApplications?.length && <ApplicationStatus />}
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

const ApplicationStats = ({
  applicants,
  hiring,
  status,
}: Pick<WorkingGroupOpeningType, 'applicants' | 'hiring' | 'status'>) => (
  <ApplicationStatsStyles>
    <MultiColumnsStatistic>
      <StatiscticContentColumn>
        <StatisticHeader title="Applicants" />
        <NumericValue>{applicants}</NumericValue>
      </StatiscticContentColumn>
      {status === OpeningStatuses.FILLED || status === OpeningStatuses.CANCELLED ? (
        <StatiscticContentColumn>
          <StatisticHeader title="Hired" />
          <FractionValue numerator={hiring.current} denominator={hiring.limit} />
        </StatiscticContentColumn>
      ) : (
        <StatiscticContentColumn>
          <StatisticHeader title="Hiring limit" />
          <NumericValue>{hiring.limit || 1}</NumericValue>
        </StatiscticContentColumn>
      )}
    </MultiColumnsStatistic>
  </ApplicationStatsStyles>
)

const ApplicationStatsStyles = styled(StatsBlock).attrs({ centered: true })`
  justify-content: start;
`
