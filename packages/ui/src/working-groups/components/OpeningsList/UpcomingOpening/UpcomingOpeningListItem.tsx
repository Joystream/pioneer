import React from 'react'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { TextBig, TextInlineBig, TokenValue } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { relativeTime } from '@/common/model/relativeTime'
import {
  ToggleableItemInfo,
  ToggleableItemInfoTop,
  ToggleableItemSummary,
  ToggleableItemTitle,
  ToggleableSubscriptionWide,
  ToggleableItemWrap,
  OpenItemSummaryColumn,
} from '@/working-groups/components/ToggleableItemStyledComponents'
import { useRewardPeriod } from '@/working-groups/hooks/useRewardPeriod'
import { UpcomingWorkingGroupOpening } from '@/working-groups/types'

export type UpcomingProps = {
  opening: UpcomingWorkingGroupOpening
  onClick?: () => void
}
export const UpcomingOpeningListItem = ({ opening, onClick }: UpcomingProps) => {
  const rewardPeriod = useRewardPeriod(opening.groupId)
  return (
    <ToggleableItemWrap onClick={onClick}>
      <ToggleableItemInfo>
        <ToggleableItemInfoTop>
          <Subscription title={`ID: ${opening.id}`}>ID: {opening.id}</Subscription>
          <Subscription>Starts {relativeTime(opening.expectedStart)}</Subscription>
          <BadgeStatus>{opening.groupName}</BadgeStatus>
        </ToggleableItemInfoTop>
        <ToggleableItemTitle>{opening.title}</ToggleableItemTitle>
      </ToggleableItemInfo>
      <ToggleableItemSummary>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={rewardPeriod?.mul(opening.rewardPerBlock)} />
          </TextInlineBig>
          <ToggleableSubscriptionWide>Reward per {rewardPeriod?.toString()} blocks.</ToggleableSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextInlineBig>
            <TokenValue value={opening.stake} />
          </TextInlineBig>
          <ToggleableSubscriptionWide>Minimum stake required</ToggleableSubscriptionWide>
        </OpenItemSummaryColumn>
        <OpenItemSummaryColumn>
          <TextBig bold>{opening.hiringLimit}</TextBig>
          <Subscription>Hiring</Subscription>
        </OpenItemSummaryColumn>
      </ToggleableItemSummary>
    </ToggleableItemWrap>
  )
}
