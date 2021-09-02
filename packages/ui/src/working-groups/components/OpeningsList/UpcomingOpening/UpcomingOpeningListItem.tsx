import React from 'react'

import { TextInlineBig, TextMedium, TokenValue } from '@/common/components/typography'
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
import { UpcomingWorkingGroupOpening } from '@/working-groups/types'

export type UpcomingProps = {
  opening: UpcomingWorkingGroupOpening
  onClick?: () => void
}
export const UpcomingOpeningListItem = ({ opening, onClick }: UpcomingProps) => (
  <ToggleableItemWrap onClick={onClick}>
    <ToggleableItemInfo>
      <ToggleableItemInfoTop>
        <Subscription>ID: {opening.id}</Subscription>
        <Subscription>Starts {relativeTime(opening.expectedStart)}</Subscription>
      </ToggleableItemInfoTop>
      <ToggleableItemTitle>{opening.title}</ToggleableItemTitle>
    </ToggleableItemInfo>
    <ToggleableItemSummary>
      <OpenItemSummaryColumn>
        <TextInlineBig>
          <TokenValue value={opening.reward.payout} />
        </TextInlineBig>
        <ToggleableSubscriptionWide>Reward per {opening.reward.blockInterval} blocks.</ToggleableSubscriptionWide>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <TextInlineBig>
          <TokenValue value={opening.stake} />
        </TextInlineBig>
        <ToggleableSubscriptionWide>Minimum stake required</ToggleableSubscriptionWide>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <TextMedium>{opening.hiringLimit}</TextMedium>
        <Subscription>Hiring</Subscription>
      </OpenItemSummaryColumn>
    </ToggleableItemSummary>
  </ToggleableItemWrap>
)
