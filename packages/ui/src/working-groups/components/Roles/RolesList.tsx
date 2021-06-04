import BN from 'bn.js'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { ButtonLink } from '@/common/components/buttons'
import { ContextMenu } from '@/common/components/ContextMenu'
import { List, ListItem } from '@/common/components/List'
import { TextInlineBig, TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { ChangeAccountModalCall } from '@/working-groups/modals/ChangeAccountModal'
import { ModalTypes } from '@/working-groups/modals/ChangeAccountModal/constants'
import { LeaveRoleModalCall } from '@/working-groups/modals/LeaveRoleModal'
import { Worker } from '@/working-groups/types'

import { workerRoleTitle } from '../../helpers'
import {
  OACItemInfo,
  OACItemInfoTop,
  OACItemSummary,
  OACItemTitle,
  OACSubscriptionWide,
  OACWrap,
  OpenItemSummaryColumn,
} from '../OpeningAndApplicationsComponents/OACStyledComponents'

export interface RolesListProps {
  workers: Worker[]
}

export const RolesList = ({ workers }: RolesListProps) => (
  <List>
    {workers.map((worker) => (
      <ListItem key={worker.id}>
        <RolesListItem worker={worker} />
      </ListItem>
    ))}
  </List>
)

const RolesListItem = ({ worker }: { worker: Worker }) => {
  const history = useHistory()
  const { showModal } = useModal()
  const changeRewardCallback = useCallback(() => {
    showModal<ChangeAccountModalCall>({
      modal: 'ChangeAccountModal',
      data: { workerId: worker.id, type: ModalTypes.CHANGE_REWARD_ACCOUNT },
    })
  }, [])
  const leaveRoleCallback = useCallback(() => {
    showModal<LeaveRoleModalCall>({
      modal: 'LeaveRole',
      data: { workerId: worker.id },
    })
  }, [])

  return (
    <OACWrap>
      <OACItemInfo>
        <OACItemInfoTop>
          <BadgeStatus>{worker.group.name}</BadgeStatus>
          {worker.isLeader && <BadgeStatus>LEADER</BadgeStatus>}
        </OACItemInfoTop>
        <Title onClick={() => history.push(`/working-groups/my-roles/${worker.id}`)}>{workerRoleTitle(worker)}</Title>
      </OACItemInfo>
      <OACItemSummary>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={new BN(worker.reward.payout)} />
          </TextInlineBig>
          <OACSubscriptionWide>Reward per {worker.reward.blockInterval} blocks</OACSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={new BN(worker.earnedTotal)} />
          </TextInlineBig>
          <OACSubscriptionWide>Earned total</OACSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={new BN(2396000)} />
          </TextInlineBig>
          <OACSubscriptionWide>Next payment in</OACSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={new BN(worker.stake)} />
          </TextInlineBig>
          <OACSubscriptionWide>Staked</OACSubscriptionWide>
        </OpenItemSummaryColumn>
      </OACItemSummary>
      <ContextMenu>
        <ButtonLink size="small" bold borderless onClick={changeRewardCallback}>
          Change reward account
        </ButtonLink>
        <ButtonLink size="small" bold borderless onClick={leaveRoleCallback}>
          Leave a position
        </ButtonLink>
      </ContextMenu>
    </OACWrap>
  )
}

const Title = styled(OACItemTitle)`
  cursor: pointer;
`
