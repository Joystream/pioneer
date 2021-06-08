import React, { memo, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AppPage } from '@/app/components/AppPage'
import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
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
import { Colors } from '@/common/constants/styles'
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { useModal } from '@/common/hooks/useModal'
import { size, spacing } from '@/common/utils/styles'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { ApplicantsList } from '@/working-groups/components/ApplicantsList'
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

  const hiredMember = useMemo(() => {
    if (opening) {
      return opening.applications.find(({ status }) => status === 'ApplicationStatusAccepted')
    }
    return null
  }, [opening])

  if (isLoading || !opening) {
    return (
      <AppPage lastBreadcrumb={id} rowGap="s">
        <RowGapBlock gap={24}>
          <ContentWithSidepanel>
            <Loading />
          </ContentWithSidepanel>
        </RowGapBlock>
      </AppPage>
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
    <ApplicationStatusWrapper>
      <Circle />
      {opening.status === OpeningStatuses.OPEN && (
        <>
          <h4>No applicants yet</h4>
          <p>There are no applicants yet lorem ipsum dolor sit amet.</p>
        </>
      )}
      {opening.status === OpeningStatuses.OPEN && <ApplyButton />}
    </ApplicationStatusWrapper>
  ))

  return (
    <AppPage lastBreadcrumb={opening.title} rowGap="s">
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
      </PageHeader>
      <RowGapBlock gap={24}>
        <Row>
          <BadgeStatus inverted size="l" separated>
            {opening.groupName}
          </BadgeStatus>
          <BadgeStatus inverted size="l" separated>
            {opening.type}
          </BadgeStatus>
          <StatusBadge />
        </Row>
        <Statistics>
          <TokenValueStat title="Current budget" tooltipText="Lorem ipsum..." value={opening.budget} />
          <DurationStatistics title="Opening Expected duration" value={opening.expectedEnding} />
          <TokenValueStat title="Reward per 3600 blocks" value={opening.reward.payout} />
          <NumericValueStat title="Hiring limit" value={opening.hiring.total} />
        </Statistics>
        <ContentWithSidepanel>
          <MainPanel ref={sideNeighborRef}>
            <MarkdownPreview markdown={opening.description} />
          </MainPanel>
          <SidePanel neighbor={sideNeighborRef}>
            <ApplicantsList
              allApplicants={opening.applications}
              myApplication={hiredMember?.member.id === activeMembership?.id ? activeMembership : undefined}
              hired={hiredMember?.member}
              hiringComplete={opening.status !== OpeningStatuses.OPEN}
              leaderId={opening.leaderId}
            />
            {opening.status === OpeningStatuses.OPEN && !opening.applications.length && <ApplicationStatus />}
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
