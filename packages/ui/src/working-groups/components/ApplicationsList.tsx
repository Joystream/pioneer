import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { ButtonGhost } from '@/common/components/buttons'
import { FileIcon } from '@/common/components/icons/FileIcon'
import { List, ListItem } from '@/common/components/List'
import { ColumnGapBlock } from '@/common/components/page/PageContent'
import { TextInlineBig, TokenValue } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { isInFuture } from '@/common/helpers'
import { useModal } from '@/common/hooks/useModal'
import { relativeTime } from '@/common/model/relativeTime'
import { WithdrawApplicationButton } from '@/working-groups/components/WithdrawApplicationButton'

import { openingTitle } from '../helpers'
import { useRewardPeriod } from '../hooks/useRewardPeriod'
import { ApplicationDetailsModalCall } from '../modals/ApplicationDetailsModal'
import { WorkingGroupApplication } from '../types/WorkingGroupApplication'

import { ApplicationID, ApplicationItemInfo, ApplicationItemWrap } from './Applications/ApplicationsItems'
import {
  OpenItemSummaryColumn,
  ToggleableItemInfoTop,
  ToggleableItemSummary,
  ToggleableItemTitle,
  ToggleableSubscriptionWide,
} from './ToggleableItemStyledComponents'

interface Props {
  applications: WorkingGroupApplication[]
  pastApplications?: boolean
}

export const ApplicationsList = ({ applications, pastApplications }: Props) => (
  <List>
    {applications.map((application) => (
      <ListItem key={application.id}>
        <ApplicationListItem application={application} past={pastApplications} />
      </ListItem>
    ))}
  </List>
)

const ApplicationListItem = ({ application, past }: { application: WorkingGroupApplication; past?: boolean }) => {
  const { showModal } = useModal()
  const { opening } = application
  const showApplicationModal = useCallback(() => {
    showModal<ApplicationDetailsModalCall>({ modal: 'ApplicationDetails', data: { applicationId: application.id } })
  }, [application.id])

  const rewardPeriod = useRewardPeriod(opening.groupId)

  const applicationStatus = useMemo(() => {
    switch (application.status) {
      case 'ApplicationStatusAccepted':
        return 'Hired'
      case 'ApplicationStatusWithdrawn':
        return 'Withdrawn'
      case 'ApplicationStatusRejected':
        return 'Rejected'
      case 'ApplicationStatusCancelled':
        return 'Cancelled'
      default:
        return 'Pending'
    }
  }, [application.status])

  return (
    <ApplicationItemWrap past={past}>
      <ApplicationItemInfo>
        <ToggleableItemInfoTop>
          <ApplicationID title={application.id}>ID: {application.runtimeId}</ApplicationID>
          {isInFuture(opening.expectedEnding) && (
            <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
          )}
          <BadgeStatus>{opening.groupName}</BadgeStatus>
          {opening.type === 'LEAD' ? <BadgeStatus>LEAD</BadgeStatus> : null}
        </ToggleableItemInfoTop>
        <Title onClick={showApplicationModal}>{openingTitle(application)}</Title>
      </ApplicationItemInfo>
      <ToggleableItemSummary>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={rewardPeriod?.mul(opening.rewardPerBlock)} />
          </TextInlineBig>
          <ToggleableSubscriptionWide>Reward per {rewardPeriod?.toString()} blocks.</ToggleableSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={application.stake} />
          </TextInlineBig>
          <Subscription>Staked</Subscription>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig value>{applicationStatus}</TextInlineBig>
          <Subscription>Status</Subscription>
        </OpenItemSummaryColumn>
      </ToggleableItemSummary>
      <ColumnGapBlock>
        <WithdrawApplicationButton application={application} />
        <ButtonGhost square size="medium" onClick={showApplicationModal}>
          <FileIcon />
        </ButtonGhost>
      </ColumnGapBlock>
    </ApplicationItemWrap>
  )
}

const Title = styled(ToggleableItemTitle)`
  cursor: pointer;
`
