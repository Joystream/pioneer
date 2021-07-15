import React from 'react'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { Arrow } from '@/common/components/icons'
import { BellIcon } from '@/common/components/icons/BellIcon'
import { StatiscticContentColumn, Statistics, StatsBlock, TwoColumnsStatistic } from '@/common/components/statistics'
import { TextBig, TokenValue } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { relativeTime } from '@/common/model/relativeTime'
import { UpcomingProps } from '@/working-groups/components/OpeningsList/UpcomingOpening/UpcomingOpeningListItem'
import {
  OpenedContainer,
  OpenedItemTitle,
  OpenedTop,
  OpenedWrapper,
} from '@/working-groups/components/ToggleableItemStyledComponents'

export const UpcomingOpeningDetails = ({ opening }: UpcomingProps) => {
  return (
    <OpenedContainer>
      <OpenedWrapper>
        <OpenedTop>
          <Subscription>Starts {relativeTime(opening.expectedStart)}</Subscription>
          <OpenedItemTitle>{opening.title}</OpenedItemTitle>
        </OpenedTop>
        <TextBig light>{opening.shortDescription}</TextBig>
        <Statistics withMargin gapSize="s">
          <StatsBlock size="m" centered>
            <TextBig>
              <TokenValue value={opening.reward.payout} />
            </TextBig>
            <Subscription>Reward per {opening.reward.blockInterval} blocks</Subscription>
          </StatsBlock>
          <StatsBlock size="m" centered>
            <TwoColumnsStatistic>
              <StatiscticContentColumn>
                <TextBig value bold>
                  {opening.hiringLimit}
                </TextBig>
                <Subscription>Target no of Hires</Subscription>
              </StatiscticContentColumn>
            </TwoColumnsStatistic>
          </StatsBlock>
          <StatsBlock size="m" centered>
            <TextBig>
              <TokenValue value={opening.reward.payout} />
            </TextBig>
            <Subscription>Minimum Stake Required</Subscription>
          </StatsBlock>
        </Statistics>
        <ButtonsGroup align="right">
          <LinkButtonGhost to={`/working-groups/upcoming-openings/${opening.id}`} size="medium">
            <Arrow direction="left" />
            Learn more
          </LinkButtonGhost>
          <ButtonPrimary size="medium" disabled>
            <BellIcon />
            Notify my when it's open
          </ButtonPrimary>
        </ButtonsGroup>
      </OpenedWrapper>
    </OpenedContainer>
  )
}
