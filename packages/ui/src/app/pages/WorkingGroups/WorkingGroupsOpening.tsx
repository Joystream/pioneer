import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AppPage } from '@/app/components/AppPage'
import { BadgeRed } from '@/common/components/BadgeRed'
import { BadgeViolet } from '@/common/components/BadgeViolet'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons/Buttons'
import { BellIcon } from '@/common/components/icons/BellIcon'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import {
  ContentWithSidepanel,
  MainPanel,
  PageFooter,
  RowGapBlock,
  SidePanel,
} from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { Statistics, TokenValueStat, DurationStatistics } from '@/common/components/statistics'
import { NumericValueStat } from '@/common/components/statistics/NumericValueStat'
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { ApplicantsList } from '@/working-groups/components/ApplicantsList'
import { OpeningStatuses, MappedStatuses } from '@/working-groups/constants'
import useOpening from '@/working-groups/hooks/useOpening'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'

export const WorkingGroupOpening = () => {
  const { id } = useParams<{ id: string }>()
  const { showModal } = useModal()
  const { active: activeMembership } = useMyMemberships()
  const { isLoading, opening } = useOpening(id)
  const { copyValue } = useCopyToClipboard()

  const hiredMember = useMemo(() => {
    if (opening) {
      return opening.applications.find(({ status }) => status === 'ApplicationStatusAccepted')
    }
    return null
  }, [opening])

  if (isLoading || !opening) {
    return <Loading />
  }

  const StatusBadge = memo(() => {
    const { status } = opening
    const label = MappedStatuses[opening.status]
    return status === OpeningStatuses.CANCELLED ? (
      <BadgeRed inverted size="l" separated>
        {label}
      </BadgeRed>
    ) : (
      <BadgeViolet inverted size="l" separated>
        {label}
      </BadgeViolet>
    )
  })

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
          {opening.status === OpeningStatuses.OPEN && (
            <ButtonPrimary
              size="medium"
              onClick={() => showModal<ApplyForRoleModalCall>({ modal: 'ApplyForRoleModal', data: { opening } })}
            >
              Apply now
            </ButtonPrimary>
          )}
          {opening.status === OpeningStatuses.UPCOMING && (
            <ButtonGhost size="small">
              <BellIcon />
              Notify me when it’s open
            </ButtonGhost>
          )}
        </ButtonsGroup>
      </PageHeader>
      <RowGapBlock>
        <Row>
          <BadgeViolet inverted size="l" separated>
            {opening.groupName}
          </BadgeViolet>
          <BadgeViolet inverted size="l" separated>
            {opening.type}
          </BadgeViolet>
          <StatusBadge />
        </Row>
        <Statistics>
          <TokenValueStat title="Current budget" helperText="Lorem ipsum..." value={opening.budget} />
          <DurationStatistics title="Opening Expected duration" value={opening.expectedEnding} />
          <TokenValueStat title="Reward per 3600 blocks" value={opening.reward.value} />
          <NumericValueStat title="Hiring limit" value={opening.hiring.total} />
        </Statistics>
        <ContentWithSidepanel>
          <MainPanel>
            <MarkdownPreview markdown={opening.description} />
          </MainPanel>
          <SidePanel>
            {opening.status !== OpeningStatuses.UPCOMING && (
              <ApplicantsList
                allApplicants={opening.applications}
                myApplication={hiredMember?.member.id === activeMembership?.id ? activeMembership : undefined}
                hired={hiredMember?.member}
                hiringComplete={opening.status !== OpeningStatuses.OPEN}
                leaderId={opening.leaderId}
              />
            )}
          </SidePanel>
        </ContentWithSidepanel>
      </RowGapBlock>
      <PageFooter>
        <BlockTime block={opening.createdAtBlock} horizontal />
      </PageFooter>
    </AppPage>
  )
}

const Row = styled.div`
  display: flex;
`
