import React from 'react'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { TextBig, TextInlineBig, TokenValue } from '@/common/components/typography'
import { Fraction } from '@/common/components/typography/Fraction'
import { Subscription } from '@/common/components/typography/Subscription'
import { isInFuture } from '@/common/helpers'
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
import { WorkingGroupOpening } from '@/working-groups/types'

export type OpeningListItemProps = {
  opening: WorkingGroupOpening
  past?: boolean
  onClick?: () => void
}

export const OpeningListItem = ({ opening, past, onClick }: OpeningListItemProps) => {
  const rewardPeriod = useRewardPeriod(opening.groupId)
  const hiringTarget = opening.hiring.limit || 1

  return (
    <ToggleableItemWrap past={past} onClick={onClick}>
      <ToggleableItemInfo>
        <ToggleableItemInfoTop>
          <Subscription title={`ID: ${opening.id}`}>ID: {opening.runtimeId}</Subscription>
          {isInFuture(opening.expectedEnding) && (
            <Subscription>Ends in {relativeTime(opening.expectedEnding)}</Subscription>
          )}
          <BadgeStatus>{opening.groupName}</BadgeStatus>
          {opening.type === 'LEAD' ? <BadgeStatus>LEAD</BadgeStatus> : null}
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
          <TextBig>{opening.applicants}</TextBig>
          <Subscription>Applications</Subscription>
        </OpenItemSummaryColumn>
        {past ? (
          <OpenItemSummaryColumn>
            <Fraction numerator={opening.hiring.current} denominator={hiringTarget} />
            <Subscription>Hired</Subscription>
          </OpenItemSummaryColumn>
        ) : (
          <OpenItemSummaryColumn>
            <TextBig bold>{hiringTarget}</TextBig>
            <Subscription>Hiring</Subscription>
          </OpenItemSummaryColumn>
        )}
      </ToggleableItemSummary>
    </ToggleableItemWrap>
  )
}
