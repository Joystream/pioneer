import BN from 'bn.js'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
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
  ToggleableItemInfo,
  ToggleableItemInfoTop,
  ToggleableItemSummary,
  ToggleableItemTitle,
  ToggleableSubscriptionWide,
  ToggleableItemWrap,
  OpenItemSummaryColumn,
} from '../ToggleableItemStyledComponents'

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
    <ToggleableItemWrap>
      <ToggleableItemInfo>
        <ToggleableItemInfoTop>
          <BadgeStatus inverted>{worker.group.name}</BadgeStatus>
          {worker.isLeader && <BadgeStatus>LEADER</BadgeStatus>}
        </ToggleableItemInfoTop>
        <Title onClick={() => history.push(`/working-groups/my-roles/${worker.id}`)}>{workerRoleTitle(worker)}</Title>
      </ToggleableItemInfo>
      <ToggleableItemSummary>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={new BN(worker.reward.payout)} />
          </TextInlineBig>
          <ToggleableSubscriptionWide>Reward per {worker.reward.blockInterval} blocks</ToggleableSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={new BN(worker.earnedTotal)} />
          </TextInlineBig>
          <ToggleableSubscriptionWide>Earned total</ToggleableSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={new BN(2396000)} />
          </TextInlineBig>
          <ToggleableSubscriptionWide>Next payment in</ToggleableSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={new BN(worker.stake)} />
          </TextInlineBig>
          <ToggleableSubscriptionWide>Staked</ToggleableSubscriptionWide>
        </OpenItemSummaryColumn>
      </ToggleableItemSummary>
      <ContextMenu
        items={[
          { text: 'Change reward account', onClick: changeRewardCallback },
          { text: 'Leave a position', onClick: leaveRoleCallback },
        ]}
      />
    </ToggleableItemWrap>
  )
}

const Title = styled(ToggleableItemTitle)`
  cursor: pointer;
`
