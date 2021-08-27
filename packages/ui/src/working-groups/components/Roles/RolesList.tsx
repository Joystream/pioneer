import BN from 'bn.js'
import React, { useCallback } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ContextMenu } from '@/common/components/ContextMenu'
import { List, ListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
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

  const roleRoute = `/working-groups/my-roles/${worker.id}`

  return (
    <RoleItemWrapper as={GhostRouterLink} to={roleRoute}>
      <ToggleableItemInfo>
        <ToggleableItemInfoTop>
          <BadgeStatus inverted>{worker.group.name}</BadgeStatus>
          {worker.isLead && <BadgeStatus>LEAD</BadgeStatus>}
        </ToggleableItemInfoTop>
        <Title>{workerRoleTitle(worker)}</Title>
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
        size="small"
        items={[
          { text: 'Change reward account', onClick: changeRewardCallback },
          { text: 'Leave a position', onClick: leaveRoleCallback },
        ]}
      />
    </RoleItemWrapper>
  )
}

const Title = styled(ToggleableItemTitle)`
  cursor: pointer;
`

const RoleItemWrapper = styled(ToggleableItemWrap)`
  ${TableListItemAsLinkHover};
`
