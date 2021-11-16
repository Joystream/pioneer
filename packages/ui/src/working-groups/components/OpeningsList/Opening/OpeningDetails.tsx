import React from 'react'

import { ButtonsGroup } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { StatiscticContentColumn, Statistics, StatsBlock, TwoColumnsStatistic } from '@/common/components/statistics'
import { TextBig, TokenValue } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { useModal } from '@/common/hooks/useModal'
import { relativeTime } from '@/common/model/relativeTime'
import { OpeningListItemProps } from '@/working-groups/components/OpeningsList/Opening/OpeningListItem'
import {
  OpenedContainer,
  OpenedItemTitle,
  OpenedTop,
  OpenedWrapper,
} from '@/working-groups/components/ToggleableItemStyledComponents'
import { useRewardPeriod } from '@/working-groups/hooks/useRewardPeriod'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { isOpeningOpen } from '@/working-groups/model/isOpeningOpen'

export const OpeningDetails = ({ opening, onClick }: OpeningListItemProps) => {
  const { showModal } = useModal()
  const rewardPeriod = useRewardPeriod(opening.groupId)

  return (
    <OpenedContainer onClick={onClick}>
      <OpenedWrapper>
        <OpenedTop>
          <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
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
            <TwoColumnsStatistic>
              <StatiscticContentColumn>
                <TextBig value bold>
                  {opening.hiring.total}
                </TextBig>
                <Subscription>Target no of Hires</Subscription>
              </StatiscticContentColumn>
            </TwoColumnsStatistic>
          </StatsBlock>
          <StatsBlock size="m" centered>
            <TextBig>
              <TokenValue value={opening.stake} />
            </TextBig>
            <Subscription>Minimum Stake Required</Subscription>
          </StatsBlock>
        </Statistics>
        <ButtonsGroup align="right">
          <LinkButtonGhost to={`/working-groups/openings/${opening.id}`} size="medium">
            Learn more
          </LinkButtonGhost>
          {isOpeningOpen(opening) && (
            <TransactionButton
              style="primary"
              onClick={() => showModal<ApplyForRoleModalCall>({ modal: 'ApplyForRoleModal', data: { opening } })}
              size="medium"
            >
              Apply now
            </TransactionButton>
          )}
        </ButtonsGroup>
      </OpenedWrapper>
    </OpenedContainer>
  )
}
