import BN from 'bn.js'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { CurrencyName } from '@/app/constants/currency'
import { BountyWinner } from '@/bounty/modals/SubmitJudgementModal/machine'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, TokenInput } from '@/common/components/forms'
import { FileIcon } from '@/common/components/icons'
import { AmountButton, AmountButtons, TransactionAmount } from '@/common/components/Modal'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { ProgressBar } from '@/common/components/Progress'
import { TextBig, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props {
  removeLastWinner: () => void
  addWinner: () => void
  winners: BountyWinner[]
  editWinner: (id: number, winner: Partial<BountyWinner>) => void
  noBountyWinners: boolean
  filter: (member: Member) => boolean
  bountyFunding: BN
  amountDistributed: BN
  validationMessage: string | null
  validIds: string[]
}

export const WinnersSelection = ({
  removeLastWinner,
  addWinner,
  winners,
  editWinner,
  noBountyWinners,
  filter,
  bountyFunding,
  amountDistributed,
  validationMessage,
  validIds,
}: Props) => {
  const { t } = useTranslation('bounty')
  const handleMemberSelection = useCallback(
    (id: number) => (winner: Member) => {
      editWinner(id, { winner })
    },
    [editWinner]
  )

  const handleRewardEdit = useCallback(
    (id: number) => (_: any, value: BN) => {
      editWinner(id, { reward: value })
    },
    [editWinner]
  )

  const handleEqualDistribution = useCallback(() => {
    const reward = bountyFunding.divn(winners.length)

    winners.forEach((winner, index) => {
      editWinner(winner.id, { reward: index === 0 ? bountyFunding : reward })
    })
  }, [winners.length, bountyFunding.toString()])

  return (
    <>
      {!noBountyWinners && (
        <RowGapBlock gap={5}>
          <ProgressBarContainer>
            <DistributedText light>
              {t('modals.submitJudgement.progressBar.distributed')}
              <TokenValue size="s" value={amountDistributed} />
            </DistributedText>
            <ProgressBar size="big" end={!amountDistributed ? 0 : amountDistributed.div(bountyFunding).toNumber()} />
            <RowGapBlock gap={5}>
              <TextSmall light>{t('modals.submitJudgement.progressBar.totalReward')}</TextSmall>
              <TokenValue size="s" value={bountyFunding} />
            </RowGapBlock>
            <ButtonGhost size="small" onClick={handleEqualDistribution}>
              {t('modals.submitJudgement.progressBar.distributeEqually')}
            </ButtonGhost>
          </ProgressBarContainer>
          {validationMessage && <TextMedium error>{t(validationMessage)}</TextMedium>}
        </RowGapBlock>
      )}
      {winners.map((winner, index) => (
        <RowGapBlock gap={15} key={`winner${index}`}>
          <InputComponent
            id={`winnerInput${index + 1}`}
            label={t('modals.submitJudgement.winner.worker.label', { number: index + 1 })}
            required
            tooltipText={t('modals.submitJudgement.winner.worker.tooltip')}
            inputSize="l"
          >
            <SelectMember
              id={`winnerInput${index + 1}`}
              selected={winner.winner}
              filter={filter}
              onChange={handleMemberSelection(winner.id)}
              validIds={validIds}
            />
          </InputComponent>
          <TransactionAmount>
            <InputComponent
              message=" "
              inputWidth="s"
              label={t('modals.submitJudgement.winner.reward')}
              required
              units={CurrencyName.integerValue}
              tight
            >
              <TokenInput
                id={`winnerRewardInput${index + 1}`}
                value={winner.reward}
                onChange={handleRewardEdit(winner.id)}
              />
            </InputComponent>
            <AmountButtons>
              {winners.length > 1 && (
                <AmountButton size="small" onClick={() => editWinner(winner.id, { reward: bountyFunding.divn(2) })}>
                  {t('modals.submitJudgement.amountButtons.useHalf')}
                </AmountButton>
              )}
              <AmountButton size="small" onClick={() => editWinner(winner.id, { reward: bountyFunding })}>
                {t('modals.submitJudgement.amountButtons.useMax')}
              </AmountButton>
            </AmountButtons>
          </TransactionAmount>
        </RowGapBlock>
      ))}
      {!noBountyWinners ? (
        <ColumnGapBlock gap={15}>
          <ButtonPrimary size="small" onClick={addWinner}>
            {t('modals.submitJudgement.winner.buttons.addWinner')}
          </ButtonPrimary>
          {winners.length > 1 && (
            <ButtonGhost size="small" onClick={removeLastWinner}>
              {t('modals.submitJudgement.winner.buttons.removeWinner')}
            </ButtonGhost>
          )}
        </ColumnGapBlock>
      ) : (
        <WarningWrapper>
          <TextBig bold value>
            <FileIcon />
            {t('modals.submitJudgement.noWinner.title')}
          </TextBig>
          <TextMedium inter light>
            {t('modals.submitJudgement.noWinner.description')}
          </TextMedium>
        </WarningWrapper>
      )}
    </>
  )
}

const DistributedText = styled(TextSmall)`
  > *:last-child {
    margin-left: 5px;
  }
`

const ProgressBarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: end;
  column-gap: 20px;

  ${TextSmall}:nth-child(1) {
    grid-row: 1/2;
  }

  ${RowGapBlock} {
    grid-row: 1/3;
    margin-right: 40px;
  }

  button {
    grid-row: 1/3;
  }
`

const WarningWrapper = styled.div`
  background-color: ${Colors.Warning[50]};
  width: 100%;
  padding: 10px 15px;

  svg {
    margin: 0 3px -1px 0;
  }

  > * {
    padding: 5px 0;
  }
`
