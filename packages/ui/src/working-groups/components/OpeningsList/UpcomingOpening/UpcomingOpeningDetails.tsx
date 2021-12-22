import React from 'react'
import { generatePath } from 'react-router-dom'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { BellIcon } from '@/common/components/icons/BellIcon'
import { StatiscticContentColumn, Statistics, StatsBlock, MultiColumnsStatistic } from '@/common/components/statistics'
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
import { WorkingGroupsRoutes } from '@/working-groups/constants/routes'
import { useRewardPeriod } from '@/working-groups/hooks/useRewardPeriod'

export const UpcomingOpeningDetails = ({ opening, onClick }: UpcomingProps) => {
  const rewardPeriod = useRewardPeriod(opening.groupId)
  return (
    <OpenedContainer onClick={onClick}>
      <OpenedWrapper>
        <OpenedTop>
          <Subscription>Starts {relativeTime(opening.expectedStart)}</Subscription>
          <OpenedItemTitle>{opening.title}</OpenedItemTitle>
        </OpenedTop>
        <TextBig light>{opening.shortDescription}</TextBig>
        <Statistics withMargin gapSize="s">
          <StatsBlock size="m" centered>
            <TextBig>
              <TokenValue value={rewardPeriod?.mul(opening.rewardPerBlock)} />
            </TextBig>
            <Subscription>Reward per {rewardPeriod?.toString()} blocks</Subscription>
          </StatsBlock>
          <StatsBlock size="m" centered>
            <MultiColumnsStatistic>
              <StatiscticContentColumn>
                <TextBig value bold>
                  {opening.hiringLimit}
                </TextBig>
                <Subscription>Target no of Hires</Subscription>
              </StatiscticContentColumn>
            </MultiColumnsStatistic>
          </StatsBlock>
          <StatsBlock size="m" centered>
            <TextBig>
              <TokenValue value={rewardPeriod?.mul(opening.rewardPerBlock)} />
            </TextBig>
            <Subscription>Minimum Stake Required</Subscription>
          </StatsBlock>
        </Statistics>
        <ButtonsGroup align="right">
          <LinkButtonGhost to={generatePath(WorkingGroupsRoutes.upcomingOpenings, { id: opening.id })} size="medium">
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
