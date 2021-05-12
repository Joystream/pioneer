import BN from 'bn.js'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '../../common/components/BadgeViolet'
import { ButtonGhost } from '../../common/components/buttons'
import { CrossIcon } from '../../common/components/icons'
import { FileIcon } from '../../common/components/icons/FileIcon'
import { List, ListItem } from '../../common/components/List'
import { TextInlineBig, TokenValue } from '../../common/components/typography'
import { Subscription } from '../../common/components/typography/Subscription'
import { useModal } from '../../common/hooks/useModal'
import { useToggle } from '../../common/hooks/useToggle'
import { openingTitle } from '../helpers'
import { ApplicationDetailsModalCall } from '../modals/ApplicationDetailsModal'
import { WithdrawApplicationModal } from '../modals/WithdrawApplicationModal/WithdrawApplicationModal'
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
    showModal<ApplicationDetailsModalCall>({ modal: 'ApplicationDetails', data: { application } })
  }, [application.id])
  const [isWithdrawModalVisible, toggleWithdrawModalVisible] = useToggle(false)

  return (
    <>
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
        <ButtonGhost square size="medium" onClick={showApplicationModal}>
          <FileIcon />
        </ButtonGhost>
        <ButtonGhost square size="medium" onClick={toggleWithdrawModalVisible}>
          <CrossIcon />
        </ButtonGhost>
      </OACWrap>
      {isWithdrawModalVisible && (
        <WithdrawApplicationModal onClose={toggleWithdrawModalVisible} application={application} />
      )}
    </>
  )
}

const Title = styled(OACItemTitle)`
  cursor: pointer;
`
