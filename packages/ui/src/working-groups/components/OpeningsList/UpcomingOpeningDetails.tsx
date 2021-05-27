import React from 'react'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { Arrow } from '@/common/components/icons'
import { StatiscticContentColumn, Statistics, StatsBlock, TwoColumnsStatistic } from '@/common/components/statistics'
import { TextBig, TokenValue } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { relativeTime } from '@/common/model/relativeTime'
import {
  OpenedContainer,
  OpenedItemTitle,
  OpenedTop,
  OpenedWrapper,
} from '@/working-groups/components/OpeningAndApplicationsComponents/OACStyledComponents'
import { UpcomingProps } from '@/working-groups/components/OpeningsList/UpcomingOpeningListItem'

export const UpcomingOpeningDetails = ({ opening }: UpcomingProps) => {
  return (
    <OpenedContainer>
      <OpenedWrapper>
        <OpenedTop>
          <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
          <OpenedItemTitle>{opening.title}</OpenedItemTitle>
        </OpenedTop>
        <TextBig light>
          Content Curators will one day be essential for ensuring that the petabytes of media items uploaded to
          Joystream are format...
        </TextBig>
        <Statistics withMargin>
          <StatsBlock size="m" centered spacing="s">
            <TextBig>
              <TokenValue value={opening.reward.value} />
            </TextBig>
            <Subscription>Reward per {opening.reward.interval} blocks</Subscription>
          </StatsBlock>
          <StatsBlock size="m" centered spacing="s">
            <TwoColumnsStatistic>
              <StatiscticContentColumn>
                <TextBig value bold>
                  .
                </TextBig>
                <Subscription>Applicant limit</Subscription>
              </StatiscticContentColumn>
              <StatiscticContentColumn>
                <TextBig value bold>
                  {opening.hiringLimit}
                </TextBig>
                <Subscription>Target no of Hires</Subscription>
              </StatiscticContentColumn>
            </TwoColumnsStatistic>
          </StatsBlock>
          <StatsBlock size="m" centered spacing="s">
            <TextBig>
              <TokenValue value={opening.reward.value} />
            </TextBig>
            <Subscription>Minimum Stake Required</Subscription>
          </StatsBlock>
        </Statistics>
        <ButtonsGroup align="right">
          <LinkButtonGhost to={`/working-groups/upcoming-openings/${opening.id}`} size="medium">
            <Arrow direction="left" />
            Learn more
          </LinkButtonGhost>
          <ButtonPrimary size="medium">Notify my when it's open</ButtonPrimary>
        </ButtonsGroup>
      </OpenedWrapper>
    </OpenedContainer>
  )
}
