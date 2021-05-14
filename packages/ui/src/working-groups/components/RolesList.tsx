import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { BadgeViolet } from '@/common/components/BadgeViolet'
import { ButtonGhost } from '@/common/components/buttons'
import { KebabMenuIcon } from '@/common/components/icons'
import { List, ListItem } from '@/common/components/List'
import { TextInlineBig, TokenValue } from '@/common/components/typography'
import { WorkerWithDetails } from '@/working-groups/types'

import { workerRoleTitle } from '../helpers'

import {
  OACItemInfo,
  OACItemInfoTop,
  OACItemSummary,
  OACItemTitle,
  OACSubscriptionWide,
  OACWrap,
  OpenItemSummaryColumn,
} from './OpeningAndApplicationsComponents/OACStyledComponents'

export interface RolesListProps {
  workers: WorkerWithDetails[]
}

export const RolesList = ({ workers }: RolesListProps) => (
  <List>
    {workers.map((worker) => (
      <ListItem key={worker.group.name + worker.membership.id}>
        <RolesListItem worker={worker} />
      </ListItem>
    ))}
  </List>
)

const RolesListItem = ({ worker }: { worker: WorkerWithDetails }) => {
  return (
    <OACWrap>
      <OACItemInfo>
        <OACItemInfoTop>
          <BadgeViolet>{worker.group.name}</BadgeViolet>
          {worker.isLeader && <BadgeViolet>LEADER</BadgeViolet>}
        </OACItemInfoTop>
        <Title>{workerRoleTitle(worker)}</Title>
      </OACItemInfo>
      <OACItemSummary>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={new BN(worker.rewardPerBlock)} />
          </TextInlineBig>
          <OACSubscriptionWide>Reward per 3600 block.</OACSubscriptionWide>
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
      <ButtonGhost square size="medium">
        <KebabMenuIcon />
      </ButtonGhost>
    </OACWrap>
  )
}

const Title = styled(OACItemTitle)`
  cursor: pointer;
`
