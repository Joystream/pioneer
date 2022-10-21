import React from 'react'

import { ButtonsGroup } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { StatiscticContentColumn, Statistics, StatsBlock, MultiColumnsStatistic } from '@/common/components/statistics'
import { TextBig, TokenValue } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { isInFuture } from '@/common/helpers'
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

export const OpeningDetails = ({ opening, onClick, past }: OpeningListItemProps) => {
  const { showModal } = useModal()
  const rewardPeriod = useRewardPeriod(opening.groupId)
  const { applicants, hiring } = opening
  const withdrawnApplications = hiring.current > applicants ? ` / (${hiring.current - applicants})` : ''

  return (
    <OpenedContainer onClick={onClick}>
      <OpenedWrapper>
        <OpenedTop>
          {isInFuture(opening.expectedEnding) && (
            <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
          )}
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
              {past && (
                <StatiscticContentColumn>
                  <TextBig value bold>
                    {applicants} {withdrawnApplications}
                  </TextBig>
                  <Subscription>Hired</Subscription>
                </StatiscticContentColumn>
              )}
              <StatiscticContentColumn>
                <TextBig value bold>
                  {hiring.limit}
                </TextBig>
                <Subscription>Target no. of Hires</Subscription>
              </StatiscticContentColumn>
            </MultiColumnsStatistic>
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
