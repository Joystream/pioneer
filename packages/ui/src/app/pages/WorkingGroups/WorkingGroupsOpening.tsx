import React, { memo, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons/Buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
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
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { ApplicantsList } from '@/working-groups/components/ApplicantsList'
import { ApplicationStatusWrapper } from '@/working-groups/components/ApplicationStatusWrapper'
import { OpeningIcon } from '@/working-groups/components/OpeningIcon'
import { MappedStatuses, OpeningStatuses } from '@/working-groups/constants'
import { useOpening } from '@/working-groups/hooks/useOpening'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'

export const WorkingGroupOpening = () => {
  const { id } = useParams<{ id: string }>()
  const { showModal } = useModal()
  const { active: activeMembership } = useMyMemberships()
  const { isLoading, opening } = useOpening(id)
  const { copyValue } = useCopyToClipboard()
  const sideNeighborRef = useRef<HTMLDivElement>(null)
  const hiringApplication = useMemo(() => {
    if (opening) {
      return opening.applications.find(({ status }) => status === 'ApplicationStatusAccepted')
    }
  }, [opening?.id])
  const myApplication = useMemo(() => {
    if (opening) {
      return opening.applications.find(({ id }) => id === activeMembership?.id)
    }
  }, [opening?.id, activeMembership?.id])

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
    <ButtonPrimary
      size="medium"
      onClick={() => showModal<ApplyForRoleModalCall>({ modal: 'ApplyForRoleModal', data: { opening } })}
    >
      Apply now!
    </ButtonPrimary>
  ))

  const ApplicationStatus = memo(() => (
    <ApplicationStatusWrapper gap={24} align="center">
      <OpeningIcon />
      {opening.status === OpeningStatuses.OPEN && (
        <RowGapBlock gap={16}>
          <h4>No applicants yet</h4>
          <TextSmall>There are no applicants yet lorem ipsum dolor sit amet.</TextSmall>
        </RowGapBlock>
      )}
      {opening.status === OpeningStatuses.OPEN && <ApplyButton />}
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
            {(opening.status === OpeningStatuses.OPEN || opening.status === OpeningStatuses.CANCELLED) && (
              <ButtonGhost size="medium" onClick={() => copyValue(window.location.href)}>
                <LinkIcon />
                Copy link
              </ButtonGhost>
            )}
            {opening.status === OpeningStatuses.OPEN && <ApplyButton />}
          </ButtonsGroup>
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
              <TokenValueStat title="Current budget" tooltipText="Lorem ipsum..." value={opening.budget} />
              <DurationStatistics title="Opening Expected duration" value={opening.expectedEnding} />
              <TokenValueStat title="Reward per 3600 blocks" value={opening.reward.payout} />
              <NumericValueStat title="Hiring limit" value={opening.hiring.total} />
            </Statistics>
          </RowGapBlock>
        </PageHeader>
      }
      main={
        <MainPanel ref={sideNeighborRef}>
          <MarkdownPreview markdown={opening.description} />
        </MainPanel>
      }
      sidebar={
        <SidePanel neighbor={sideNeighborRef}>
          <ApplicantsList
            allApplicants={opening.applications}
            myApplication={myApplication}
            hired={hiringApplication}
            hiringComplete={opening.status !== OpeningStatuses.OPEN}
            leaderId={opening.leaderId}
          />
          {opening.status === OpeningStatuses.OPEN && !opening.applications.length && <ApplicationStatus />}
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
