import BN from 'bn.js'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '../../common/components/BadgeStatus/BadgeStatus'
import { ButtonGhost } from '../../common/components/buttons'
import { FileIcon } from '../../common/components/icons/FileIcon'
import { List, ListItem } from '../../common/components/List'
import { TextInlineBig, TokenValue } from '../../common/components/typography'
import { Subscription } from '../../common/components/typography/Subscription'
import { useModal } from '../../common/hooks/useModal'
import { openingTitle } from '../helpers'
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
  const showApplicationModal = useCallback(() => {
    showModal<ApplicationDetailsModalCall>({ modal: 'ApplicationDetails', data: { applicationId: application.id } })
  }, [application.id])

  return (
    <ApplicationItemWrap past={past}>
      <ApplicationItemInfo>
        <ToggleableItemInfoTop>
          <ApplicationID title={application.id}>ID: {application.id}</ApplicationID>
          <Subscription>Time left: 6 days 23 minutes</Subscription>
          <BadgeStatus>LEAD</BadgeStatus>
        </ToggleableItemInfoTop>
        <Title onClick={showApplicationModal}>{openingTitle(application)}</Title>
      </ApplicationItemInfo>
      <ToggleableItemSummary>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={application.opening.reward.payout} />
          </TextInlineBig>
          <ToggleableSubscriptionWide>
            Reward per {application.opening.reward.blockInterval} blocks.
          </ToggleableSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={new BN(100)} />
          </TextInlineBig>
          <Subscription>Staked</Subscription>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig value>No</TextInlineBig>
          <Subscription>Hired</Subscription>
        </OpenItemSummaryColumn>
      </ToggleableItemSummary>
      <ButtonGhost square size="medium" onClick={showApplicationModal}>
        <FileIcon />
      </ButtonGhost>
    </ApplicationItemWrap>
  )
}

const Title = styled(ToggleableItemTitle)`
  cursor: pointer;
`
