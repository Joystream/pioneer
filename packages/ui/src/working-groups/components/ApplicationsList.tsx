import BN from 'bn.js'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { List, ListItem } from '../../common/components/List'
import { TextInlineBig, TokenValue } from '../../common/components/typography'
import { Subscription } from '../../common/components/typography/Subscription'
import { useModal } from '../../common/hooks/useModal'
import { openingTitle } from '../helpers'
import { ApplicationDetailsModalCall } from '../modals/ApplicationDetailsModal'
import { WorkingGroupApplication } from '../types/WorkingGroupApplication'

import {
  OACItemInfo,
  OACItemInfoTop,
  OACItemSummary,
  OACItemTitle,
  OACSubscriptionWide,
  OACWrap,
  OpenItemSummaryColumn,
} from './OpeningAndApplicationsComponents/OACStyledComponents'

interface Props {
  applications: WorkingGroupApplication[]
}

export const ApplicationsList = ({ applications }: Props) => (
  <List>
    {applications.map((application) => (
      <ListItem key={application.id}>
        <ApplicationListItem application={application} />
      </ListItem>
    ))}
  </List>
)

const ApplicationListItem = ({ application }: { application: WorkingGroupApplication }) => {
  const { showModal } = useModal()
  const showApplicationModal = useCallback(() => {
    showModal<ApplicationDetailsModalCall>({ modal: 'ApplicationDetails', data: { application: application } })
  }, [application.id])

  return (
    <OACWrap>
      <OACItemInfo>
        <OACItemInfoTop>
          <Subscription>ID: {application.id}</Subscription>
          <Subscription>Time left: 6 days 23 minutes</Subscription>
          <BadgeViolet>LEAD</BadgeViolet>
        </OACItemInfoTop>
        <Title onClick={showApplicationModal}>{openingTitle(application)}</Title>
      </OACItemInfo>
      <OACItemSummary>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={application.opening?.reward} />
          </TextInlineBig>
          <OACSubscriptionWide>Reward per blocks.</OACSubscriptionWide>
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
      </OACItemSummary>
    </OACWrap>
  )
}

const Title = styled(OACItemTitle)`
  cursor: pointer;
`
