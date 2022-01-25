import { useMachine } from '@xstate/react'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  CheckBoxLabelWrapper,
  InlineToggleWrap,
  StyledParagraph,
} from '@/bounty/modals/AddBountyModal/components/FundingDetailsStep'
import { SlashedSelection } from '@/bounty/modals/SubmitJudgementModal/components/SlashedSelection'
import { WinnersSelection } from '@/bounty/modals/SubmitJudgementModal/components/WinnersSelection'
import { submitJudgementMachine } from '@/bounty/modals/SubmitJudgementModal/machine'
import { SubmitWorkModalCall } from '@/bounty/modals/SubmitWorkModal'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputContainer, Label, ToggleCheckbox } from '@/common/components/forms'
import { ModalDivider, Modal, ModalFooter, ModalHeader, ScrolledModalBody } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextHuge, TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Member } from '@/memberships/types'

export const SubmitJudgementModal = () => {
  const {
    hideModal,
    modalData: { bounty },
  } = useModal<SubmitWorkModalCall>()
  // const { active: activeMember } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const [state, send] = useMachine(submitJudgementMachine)

  const switchCheckbox = useCallback((isSet: boolean) => {
    if (!isSet) {
      send('CLEAN_WINNERS')
    }
    send('SET_HAS_WINNER', { hasWinner: isSet })
  }, [])

  const selectWorkerFilter = useCallback(
    (member: Member) => {
      const isWorker = bounty.entries?.some((entry) => entry.worker.id === member.id)
      if (!isWorker) {
        return false
      }

      const isWinner = state.context.winners.some((winner) => winner.winner.id === member.id)
      const isSlashed = state.context.rejected.some((loser) => loser.id === member.id)

      return !(isWinner || isSlashed)
    },
    [state.context.winners.length, state.context.rejected.length]
  )

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader title="Submit Judgement" onClick={hideModal} />
      <ScrolledModalBody>
        <ModalContainer gap={40}>
          <TextHuge bold>Select Winners</TextHuge>
          <Container
            disabled
            label={t('modals.bountyCancel.bountyInput.label')}
            tooltipText={t('modals.bountyCancel.bountyInput.tooltipText')}
            inputSize="l"
          >
            <TextBig value bold>
              {bounty.title}
            </TextBig>
          </Container>
          <InlineToggleWrap>
            <Label>Does Bounty have a winner? </Label>
            <ToggleCheckbox
              falseLabel={<CheckBoxLabelWrapper>No</CheckBoxLabelWrapper>}
              trueLabel={
                <CheckBoxLabelWrapper>
                  <StyledParagraph>Yes</StyledParagraph>
                </CheckBoxLabelWrapper>
              }
              checked={state.context.hasWinner}
              onChange={switchCheckbox}
            />
          </InlineToggleWrap>
          <WinnersSelection
            filter={selectWorkerFilter}
            noBountyWinners={!state.context.hasWinner}
            winners={state.context.winners}
            addWinner={(winner) => send('ADD_WINNER', { winner })}
            removeLastWinner={() => send('REMOVE_LAST_WINNER')}
            editWinnerReward={(winner, reward) => send('EDIT_WINNER_REWARD', { payload: { winner, reward } })}
          />

          <ModalDivider />

          <TextHuge bold>Slash workers</TextHuge>
          <TextMedium inter>
            You can optionally slash workers. Slash amount can’t be higher that stake value.
          </TextMedium>
          <SlashedSelection
            filter={selectWorkerFilter}
            removeLastSlashed={() => send('REMOVE_LAST_SLASHED')}
            addSlashed={(slashed) => send('ADD_SLASHED', { slashed })}
            slashed={state.context.rejected}
          />
        </ModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium">Submit Judgment</ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const Container = styled(InputComponent)`
  ${InputContainer} {
    padding-left: 16px;
  }
`

const ModalContainer = styled(RowGapBlock)`
  padding: 24px 24px 20px;
`
