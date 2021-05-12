import React from 'react'
import styled from 'styled-components'
import BN from 'bn.js'

import { BadgeViolet } from '@/common/components/BadgeViolet'
import { List, ListItem } from '@/common/components/List'
import {
  OACItemInfo,
  OACItemInfoTop,
  OACItemSummary,
  OACItemTitle,
  OACSubscriptionWide,
  OACWrap,
  OpenItemSummaryColumn,
} from './OpeningAndApplicationsComponents/OACStyledComponents'
import { TextInlineBig, TokenValue } from '@/common/components/typography'
import { ButtonGhost } from '@/common/components/buttons'
import { FileIcon } from '@/common/components/icons/FileIcon'
import { WorkerWithDetails } from '@/working-groups/hooks/useMyWorkers'

interface Props {
  workers: WorkerWithDetails[]
}

export const RolesList = ({ workers }: Props) => (
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
          <BadgeViolet>STORAGE</BadgeViolet>
        </OACItemInfoTop>
        <Title>Storage provider</Title>
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
        <FileIcon />
      </ButtonGhost>
    </OACWrap>
  )
}

const Title = styled(OACItemTitle)`
  cursor: pointer;
`
