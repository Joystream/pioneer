import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { BountyWinner } from '@/bounty/modals/SubmitJudgementModal/machine'
import { ButtonGhost } from '@/common/components/buttons'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { FileIcon } from '@/common/components/icons'
import { AmountButton, AmountButtons, TransactionAmount } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium } from '@/common/components/typography'
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
}

export const WinnersSelection = ({
  removeLastWinner,
  addWinner,
  winners,
  editWinnerReward,
  noBountyWinners,
  filter,
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

  return (
    <>
      {winners.map((winner, index) => (
        <RowGapBlock gap={15}>
          <SelectedMember disabled label={`Winner ${index + 1}`} tooltipText="Lorem ipsum" member={winner.winner} />
          <TransactionAmount>
            <InputComponent message=" " inputWidth="s" label="Reward" required units="JOY" tight>
              <InputNumber isTokenValue value={String(winner.reward)} onChange={handleRewardEdit(winner.winner)} />
            </InputComponent>
            <AmountButtons>
              <AmountButton size="small">Use Half</AmountButton>
              <AmountButton size="small">Use max</AmountButton>
            </AmountButtons>
          </TransactionAmount>
        </RowGapBlock>
      ))}
      {!noBountyWinners ? (
        <RowGapBlock gap={15}>
          <InputComponent label="New winner" required tooltipText="Lorem ipsum" inputSize="l">
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
              <AmountButton size="small">Use Half</AmountButton>
              <AmountButton size="small">Use max</AmountButton>
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
