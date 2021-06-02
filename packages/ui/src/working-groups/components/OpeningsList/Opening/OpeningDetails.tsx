import React, { useCallback } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { MoveFoundsModalType } from '@/accounts/modals/MoveFoundsModal/constants'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { Arrow } from '@/common/components/icons'
import { StatiscticContentColumn, Statistics, StatsBlock, TwoColumnsStatistic } from '@/common/components/statistics'
import { TextBig, TokenValue } from '@/common/components/typography'
import { Subscription } from '@/common/components/typography/Subscription'
import { useModal } from '@/common/hooks/useModal'
import { relativeTime } from '@/common/model/relativeTime'
import { Props } from '@/working-groups/components/OpeningsList/Opening/OpeningListItem'
import {
  OpenedContainer,
  OpenedItemTitle,
  OpenedTop,
  OpenedWrapper,
} from '@/working-groups/components/ToggleableItemStyledComponents'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { isOpeningOpen } from '@/working-groups/model/isOpeningOpen'

export const OpeningDetails = ({ opening }: Props) => {
  const { showModal } = useModal()
  const requiredStake = opening.stake.toNumber()
  const { hasRequiredStake, transferableAccounts, accountsWithLockedFounds } = useHasRequiredStake(requiredStake)

  const onApplyNowClick = useCallback(() => {
    if (hasRequiredStake === true) {
      showModal<ApplyForRoleModalCall>({ modal: 'ApplyForRoleModal', data: { opening } })
    }
    if (hasRequiredStake === false) {
      if (transferableAccounts) {
        showModal<MoveFundsModalCall>({
          modal: 'MoveFundsModal',
          data: { type: MoveFoundsModalType.TRANSFERABLE, accounts: transferableAccounts, requiredStake },
        })
      } else if (!transferableAccounts && accountsWithLockedFounds && Object.keys(accountsWithLockedFounds).length) {
        showModal<MoveFundsModalCall>({
          modal: 'MoveFundsModal',
          data: {
            type: MoveFoundsModalType.LOCKED_FOUNDS,
            lockedFoundsAccounts: accountsWithLockedFounds,
            requiredStake,
          },
        })
      } else {
        showModal<MoveFundsModalCall>({
          modal: 'MoveFundsModal',
          data: { type: MoveFoundsModalType.NO_FOUNDS, requiredStake },
        })
      }
    }
  }, [hasRequiredStake, transferableAccounts])

  return (
    <OpenedContainer>
      <OpenedWrapper>
        <OpenedTop>
          <Subscription>Ends {relativeTime(opening.expectedEnding)}</Subscription>
          <OpenedItemTitle>{opening.title}</OpenedItemTitle>
        </OpenedTop>
        <TextBig light>{opening.shortDescription}</TextBig>
        <Statistics withMargin>
          <StatsBlock size="m" centered spacing="s">
            <TextBig>
              <TokenValue value={opening.reward.payout} />
            </TextBig>
            <Subscription>Reward per {opening.reward.blockInterval} blocks</Subscription>
          </StatsBlock>
          <StatsBlock size="m" centered spacing="s">
            <TwoColumnsStatistic>
              <StatiscticContentColumn>
                <TextBig value bold>
                  {opening.applicants.total}
                </TextBig>
                <Subscription>Applicant limit</Subscription>
              </StatiscticContentColumn>
              <StatiscticContentColumn>
                <TextBig value bold>
                  {opening.hiring.total}
                </TextBig>
                <Subscription>Target no of Hires</Subscription>
              </StatiscticContentColumn>
            </TwoColumnsStatistic>
          </StatsBlock>
          <StatsBlock size="m" centered spacing="s">
            <TextBig>
              <TokenValue value={opening.stake} />
            </TextBig>
            <Subscription>Minimum Stake Required</Subscription>
          </StatsBlock>
        </Statistics>
        <ButtonsGroup align="right">
          <LinkButtonGhost to={`/working-groups/openings/${opening.id}`} size="medium">
            <Arrow direction="left" />
            Learn more
          </LinkButtonGhost>
          <ButtonPrimary onClick={onApplyNowClick} size="medium" disabled={!isOpeningOpen(opening)}>
            Apply now
          </ButtonPrimary>
        </ButtonsGroup>
      </OpenedWrapper>
    </OpenedContainer>
  )
}
