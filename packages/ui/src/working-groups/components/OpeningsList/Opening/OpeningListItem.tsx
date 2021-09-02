import React from 'react'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { TextInlineBig, TokenValue } from '@/common/components/typography'
import { Fraction } from '@/common/components/typography/Fraction'
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
import { WorkingGroupOpening } from '@/working-groups/types'

export type OpeningListItemProps = {
  opening: WorkingGroupOpening
  past?: boolean
  onClick?: () => void
}

export const OpeningListItem = ({ opening, past, onClick }: OpeningListItemProps) => (
  <ToggleableItemWrap past={past} onClick={onClick}>
    <ToggleableItemInfo>
      <ToggleableItemInfoTop>
        <Subscription>ID: {opening.id}</Subscription>
        <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
        {opening.type === 'LEAD' ? <BadgeStatus>LEAD</BadgeStatus> : null}
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
        <Fraction numerator={opening.applicants.current} denominator={opening.applicants.total} sameSize />
        <Subscription>Applications</Subscription>
      </OpenItemSummaryColumn>
      <OpenItemSummaryColumn>
        <Fraction numerator={opening.hiring.current} denominator={opening.hiring.total} sameSize />
        <Subscription>Hiring</Subscription>
      </OpenItemSummaryColumn>
    </ToggleableItemSummary>
  </ToggleableItemWrap>
)
