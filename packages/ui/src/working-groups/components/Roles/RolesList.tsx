import BN from 'bn.js'
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { useApi } from '@/api/hooks/useApi'
import { ContextMenu, ContextMenuContainer } from '@/common/components/ContextMenu'
import { List, ListItem, TableListItemAsLinkHover } from '@/common/components/List'
import { GhostRouterLink } from '@/common/components/RouterLink'
import { TextInlineBig, TokenValue } from '@/common/components/typography'
import { Transitions, Fonts, Colors, BorderRad } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useRewardPeriod } from '@/working-groups/hooks/useRewardPeriod'
import { useWorkerEarnings } from '@/working-groups/hooks/useWorkerEarnings'

import { useMyEarnings } from '@/working-groups/hooks/useMyEarnings'

import { ChangeAccountModalCall } from '@/working-groups/modals/ChangeAccountModal'
import { ModalTypes } from '@/working-groups/modals/ChangeAccountModal/constants'
import { LeaveRoleModalCall } from '@/working-groups/modals/LeaveRoleModal'
import { Worker } from '@/working-groups/types'

import { useCurrentBlockNumber } from '../../../common/hooks/useCurrentBlockNumber'
import { getNextPayout } from '../../model/getNextPayout'
import { BN_ZERO } from '../../../common/constants'
import { workerRoleTitle } from '../../helpers'
import {
  OpenItemSummaryColumn,
  ToggleableItemInfo,
  ToggleableItemInfoTop,
  ToggleableItemSummary,
  ToggleableItemTitle,
  ToggleableItemWrap,
  ToggleableSubscriptionWide,
} from '../ToggleableItemStyledComponents'

import { NumericValue } from '../../../common/components/statistics/NumericValueStat'
import { TextMedium } from '../../../common/components/typography'
import { WorkingDetails } from '../../../bounty/components/BountyListItem/components/WorkingDetails'

export interface RolesListProps {
  workers: Worker[]
}

export const RolesList = ({ workers }: RolesListProps) => {
  const blockNumber = useCurrentBlockNumber()
  const { api } = useApi()
  const nextPayout = useMemo(
    () => blockNumber && getNextPayout(workers, blockNumber, api),
    [workers.length, blockNumber?.toNumber()]
  )

  return (
    <List>
      {workers.map((worker) => (
        <ListItem key={worker.id} borderless>
          <RolesListItem worker={worker} payout={nextPayout} />
        </ListItem>
      ))}
    </List>
  )
}

const RolesListItem = ({ worker, payout = BN_ZERO }: { worker: Worker; payout?: BN }) => {
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

  const { earnings } = useWorkerEarnings(worker.id)

  console.log(earnings)

  const myEarnings = useMyEarnings()

  const rewardPeriod = useRewardPeriod(worker.group.id)

  const roleRoute = `/working-groups/my-roles/${worker.id}`

  return (
    <RoleItemWrapper>
      <ToggleableItemInfo>
        <ToggleableItemInfoTop>
          <BadgeStatus>{worker.group.name}</BadgeStatus>
          {worker.isLead && <BadgeStatus>LEAD</BadgeStatus>}
        </ToggleableItemInfoTop>
        <RoleTitle as={GhostRouterLink} to={roleRoute}>
          {workerRoleTitle(worker)}
        </RoleTitle>
      </ToggleableItemInfo>
      <ToggleableItemSummary>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={rewardPeriod?.mul(worker.rewardPerBlock)} />
          </TextInlineBig>
          <ToggleableSubscriptionWide>Reward per {rewardPeriod?.toString()} blocks</ToggleableSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={earnings} />
          </TextInlineBig>
          <ToggleableSubscriptionWide>Earned total</ToggleableSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <NumericValue>{payout?.gte(BN_ZERO) ? payout?.toString() + ' blocks' : '–'}</NumericValue>
            {/* {payout && <TextMedium lighter>({payout && blocksToTime(payout)})</TextMedium>} */}
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

const RoleItemWrapper = styled(ToggleableItemWrap)`
  position: relative;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover};

  ${ToggleableItemInfo},
  ${TextInlineBig},
  ${ContextMenuContainer} {
    z-index: 1;
  }
`

const RoleTitle = styled(ToggleableItemTitle)`
  font-family: ${Fonts.Grotesk};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  transition: ${Transitions.all};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &:hover,
  &:focus {
    color: ${Colors.Blue[500]};
  }
`
