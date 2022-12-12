import React from 'react'
import styled from 'styled-components'

import { ButtonsGroup } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { StatiscticContentColumn, Statistics, StatsBlock, MultiColumnsStatistic } from '@/common/components/statistics'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextBig, TokenValue } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { isInFuture, nameMapping } from '@/common/helpers'
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
import { groupNameToURLParam } from '@/working-groups/model/workingGroupName'

export const OpeningDetails = ({ opening, onClick, past }: OpeningListItemProps) => {
  const { showModal } = useModal()
  const rewardPeriod = useRewardPeriod(opening.groupId)
  const groupName = groupNameToURLParam(nameMapping(opening.groupName))
  const openingRoute = `/working-groups/openings/${groupName}-${opening.runtimeId}`

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
                    {opening.hiring.current}
                  </TextBig>
                  <Subscription>Hired</Subscription>
                </StatiscticContentColumn>
              )}
              <StatiscticContentColumn>
                <TextBig value bold>
                  {opening.hiring.limit || 1}
                </TextBig>
                <Subscription>Target no. of Hires</Subscription>
              </StatiscticContentColumn>
            </MultiColumnsStatistic>
          </StatsBlock>
          <StatsBlock size="m" centered>
            <TextBig>
              <TokenValue value={opening.stake} />
            </TextBig>
            <MinStake>
              Minimum Stake Required{' '}
              <Tooltip
                tooltipText="Minimum tokens free of rivalrous locks required as application stake to this role."
                tooltipLinkText="Learn more"
                tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/working-groups#staking"
              >
                <TooltipDefault />
              </Tooltip>
            </MinStake>
          </StatsBlock>
        </Statistics>
        <ButtonsGroup align="right">
          <LinkButtonGhost to={openingRoute} size="medium">
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

const MinStake = styled(Subscription)`
  display: flex;
  align-items: center;
  gap: 8px;
`
