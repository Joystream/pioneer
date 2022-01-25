import BN from 'bn.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { BountyWinner } from '@/bounty/modals/SubmitJudgementModal/machine'
import { ButtonGhost } from '@/common/components/buttons'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { FileIcon } from '@/common/components/icons'
import { AmountButton, AmountButtons, TransactionAmount } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { ProgressBar } from '@/common/components/Progress'
import { TextBig, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { SelectedMember, SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props {
  removeLastWinner: () => void
  addWinner: (winner: BountyWinner) => void
  winners: BountyWinner[]
  editWinnerReward: (winner: Member, amount: number) => void
  noBountyWinners: boolean
  filter: (member: Member) => boolean
  bountyFunding: BN
  amountDistributed: number
}

export const WinnersSelection = ({
  removeLastWinner,
  addWinner,
  winners,
  editWinnerReward,
  noBountyWinners,
  filter,
  bountyFunding,
  amountDistributed,
}: Props) => {
  const [newWinnerReward, setNewWinnerReward] = useState<number>(0)

  const handleMemberSelection = useCallback(
    (winner) => {
      addWinner({
        winner,
        reward: newWinnerReward,
      })
      setNewWinnerReward(0)
    },
    [newWinnerReward]
  )

  const handleRewardEdit = useCallback(
    (winner: Member) => (_: any, value: number) => {
      editWinnerReward(winner, value)
    },
    [editWinnerReward]
  )

  const handleEqualDistribution = useCallback(() => {
    winners.forEach((winner) => {
      editWinnerReward(winner.winner, Math.floor(bountyFunding.toNumber() / winners.length))
    })
  }, [winners.length, bountyFunding.toNumber()])

  return (
    <>
      {!noBountyWinners && (
        <RowGapBlock gap={5}>
          <ProgressBarContainer>
            <DistributedText light>
              Distributed
              <TokenValue size="s" value={amountDistributed} />
            </DistributedText>
            <ProgressBar size="big" end={!amountDistributed ? 0 : amountDistributed / bountyFunding.toNumber()} />
            <RowGapBlock gap={5}>
              <TextSmall light>Total reward</TextSmall>
              <TokenValue size="s" value={bountyFunding.toNumber()} />
            </RowGapBlock>
            <ButtonGhost size="small" onClick={handleEqualDistribution}>
              Distribute equally
            </ButtonGhost>
            {amountDistributed > bountyFunding.toNumber() && (
              <TextMedium error>Distributed amount exceed total reward! Please decrease it.</TextMedium>
            )}
          </ProgressBarContainer>
        </RowGapBlock>
      )}
      {winners.map((winner, index) => (
        <RowGapBlock gap={15}>
          <SelectedMember disabled label={`Winner ${index + 1}`} tooltipText="Lorem ipsum" member={winner.winner} />
          <TransactionAmount>
            <InputComponent message=" " inputWidth="s" label="Reward" required units="JOY" tight>
              <InputNumber isTokenValue value={String(winner.reward)} onChange={handleRewardEdit(winner.winner)} />
            </InputComponent>
            <AmountButtons>
              {winners.length > 1 && (
                <AmountButton
                  size="small"
                  onClick={() => editWinnerReward(winner.winner, Math.floor(bountyFunding.toNumber() / 2))}
                >
                  Use Half
                </AmountButton>
              )}
              <AmountButton size="small" onClick={() => editWinnerReward(winner.winner, bountyFunding.toNumber())}>
                Use max
              </AmountButton>
            </AmountButtons>
          </TransactionAmount>
        </RowGapBlock>
      ))}
      {!noBountyWinners ? (
        <RowGapBlock gap={15}>
          <InputComponent label="Add new winner" required tooltipText="Lorem ipsum" inputSize="l">
            <SelectMember filter={filter} onChange={handleMemberSelection} />
          </InputComponent>
          <TransactionAmount>
            <InputComponent message=" " inputWidth="s" label="Reward" required units="JOY" tight>
              <InputNumber
                isTokenValue
                value={String(newWinnerReward)}
                onChange={(_, value) => setNewWinnerReward(value)}
              />
            </InputComponent>
            <AmountButtons>
              {winners.length > 1 && (
                <AmountButton size="small" onClick={() => setNewWinnerReward(Math.floor(bountyFunding.toNumber() / 2))}>
                  Use Half
                </AmountButton>
              )}
              <AmountButton size="small" onClick={() => setNewWinnerReward(bountyFunding.toNumber())}>
                Use max
              </AmountButton>
            </AmountButtons>
          </TransactionAmount>
          {!!winners.length && (
            <ButtonGhost size="small" onClick={removeLastWinner}>
              Remove last
            </ButtonGhost>
          )}
        </RowGapBlock>
      ) : (
        <WarningWrapper>
          <TextBig bold value>
            <FileIcon />
            Are you sure?
          </TextBig>
          <TextMedium inter light>
            Bounty will be closed and marked as failed
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
