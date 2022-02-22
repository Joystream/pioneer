import { createType, registry } from '@joystream/types'
import { EntryId, OracleWorkEntryJudgment } from '@joystream/types/bounty'
import { BTreeMap } from '@polkadot/types'
import { useMachine } from '@xstate/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import {
  CheckBoxLabelWrapper,
  InlineToggleWrap,
  StyledParagraph,
} from '@/bounty/modals/AddBountyModal/components/FundingDetailsStep'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal'
import { SlashedSelection } from '@/bounty/modals/SubmitJudgementModal/components/SlashedSelection'
import { WinnersSelection } from '@/bounty/modals/SubmitJudgementModal/components/WinnersSelection'
import {
  BountyRejected,
  BountyWinner,
  submitJudgementMachine,
  SubmitJudgementStates,
} from '@/bounty/modals/SubmitJudgementModal/machine'
import { SubmitWorkModalCall } from '@/bounty/modals/SubmitWorkModal'
import { SuccessTransactionModal } from '@/bounty/modals/SuccessTransactionModal'
import { ButtonPrimary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputContainer, Label, ToggleCheckbox } from '@/common/components/forms'
import { Modal, ModalDivider, ModalFooter, ModalHeader, ScrolledModalBody } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextHuge, TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

export const SubmitJudgementModal = () => {
  const {
    hideModal,
    modalData: { bounty },
  } = useModal<SubmitWorkModalCall>()
  const [state, send, service] = useMachine(submitJudgementMachine)
  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const { t } = useTranslation('bounty')
  const { api, isConnected } = useApi()

  const [isValid, setIsValid] = useState<string | null>(null)

  if (!service.initialized) {
    service.start()
  }

  const switchCheckbox = useCallback((isSet: boolean) => {
    if (!isSet) {
      send('CLEAN_WINNERS')
    }
    send('SET_HAS_WINNER', { hasWinner: isSet })

    if (isSet && !state.context.hasWinner) {
      send('ADD_WINNER')
    }
  }, [])

  const amountDistributed = useMemo(
    () => state.context.winners.reduce((prev, current) => prev + (current.reward ?? 0), 0),
    [state.context.winners]
  )

  const selectWorkerFilter = useCallback(
    (member: Member) => {
      const isWorker = bounty.entries?.some((entry) => entry.worker.id === member.id)
      if (!isWorker) {
        return false
      }

      const isWinner = state.context.winners
        .filter((winner) => winner.winner && winner.reward)
        .some((winner) => winner?.winner?.id === member.id)
      const isSlashed = state.context.rejected
        .filter((loser) => !!loser.rejected)
        .some((loser) => loser.rejected?.id === member.id)

      return !(isWinner || isSlashed)
    },
    [state.context.winners.length, state.context.rejected.length]
  )

  const transaction = useMemo(() => {
    if (api && isConnected && activeMember) {
      const validWinners = state.context.winners.filter(
        (winner) => winner.winner && winner.reward
      ) as Required<BountyWinner>[]
      const winnersApi = validWinners.map(
        ({ winner, reward }) =>
          [
            createType<EntryId, 'EntryId'>(
              'EntryId',
              Number(bounty.entries?.find((entry) => entry.worker.id === winner.id)?.id) ?? 0
            ),
            createType<OracleWorkEntryJudgment, 'OracleWorkEntryJudgment'>('OracleWorkEntryJudgment', {
              Winner: { reward: createType('u128', reward) },
            }),
          ] as const
      )

      const validRejections = state.context.rejected.filter(
        (rejection) => rejection.rejected
      ) as Required<BountyRejected>[]
      const rejectedApi = validRejections.map(
        (loser) =>
          [
            createType<EntryId, 'EntryId'>(
              'EntryId',
              Number(bounty.entries?.find((entry) => entry.worker.id === loser.rejected.id)?.id) ?? 0
            ),
            createType<OracleWorkEntryJudgment, 'OracleWorkEntryJudgment'>('OracleWorkEntryJudgment', {
              Rejected: null,
            }),
          ] as const
      )

      const rationale = '' // TODO
      const judgements = [...winnersApi, ...rejectedApi]

      return api?.tx.bounty.submitOracleJudgment(
        { Member: createType('u64', Number(activeMember?.id || 0)) },
        createType('u32', Number(bounty.id || 0)),
        new BTreeMap(registry, 'EntryId', 'OracleWorkEntryJudgment', new Map(judgements)),
        rationale
      )
    }
  }, [api, isConnected, bounty, state.context])

  useEffect(() => {
    const rewardMod = bounty.totalFunding.toNumber() % state.context.winners.length
    const reward = Math.floor(bounty.totalFunding.toNumber() / state.context.winners.length)

    state.context.winners.forEach((winner, index) => {
      send('EDIT_WINNER', {
        payload: {
          id: winner.id,
          winner: { reward: index === 0 ? reward + rewardMod : reward },
        },
      })
    })
  }, [state.context.winners.length])

  useEffect(() => {
    const { winners, hasWinner } = state.context

    switch (true) {
      case !hasWinner:
        return setIsValid(null)

      case hasWinner && (!winners.length || winners.some((winner) => !winner.winner)):
        return setIsValid('modals.submitJudgement.validation.pickWinner')

      case winners.some(({ reward }) => reward === 0):
        return setIsValid('modals.submitJudgement.validation.winnerNoReward')

      case amountDistributed < bounty.totalFunding.toNumber():
        return setIsValid('modals.submitJudgement.validation.amountTooLow')

      case amountDistributed > bounty.totalFunding.toNumber():
        return setIsValid('modals.submitJudgement.validation.amountTooHigh')

      default:
        return setIsValid(null)
    }
  }, [state.context.winners, state.context.hasWinner])

  if (!activeMember || !transaction) {
    return null
  }

  if (state.matches(SubmitJudgementStates.transaction)) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <AuthorizeTransactionModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        description={t('modals.submitJudgement.authorizeModal.description')}
        buttonLabel={t('modals.submitJudgement.authorizeModal.button')}
      />
    )
  }

  if (state.matches(SubmitJudgementStates.success)) {
    return (
      <SuccessTransactionModal
        onClose={hideModal}
        onButtonClick={hideModal}
        message={t('modals.submitJudgement.successModal.message')}
        buttonLabel={t('modals.submitJudgement.successModal.button')}
      />
    )
  }

  if (state.matches(SubmitJudgementStates.error)) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {t('modals.submitJudgement.failedModal')}
      </FailureModal>
    )
  }

  if (state.matches(SubmitJudgementStates.canceled)) {
    return <FailureModal onClose={hideModal}>{t('modals.submitJudgement.canceledModal')}</FailureModal>
  }

  return (
    <Modal onClose={hideModal} modalSize="m" modalHeight="xl">
      <ModalHeader title={t('modals.submitJudgement.submitJudgement')} onClick={hideModal} />
      <ScrolledModalBody>
        <ModalContainer gap={40}>
          <TextHuge bold>{t('modals.submitJudgement.selectWinners')}</TextHuge>
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
            <Label>{t('modals.submitJudgement.checkbox.label')}</Label>
            <ToggleCheckbox
              falseLabel={<CheckBoxLabelWrapper>{t('modals.submitJudgement.checkbox.false')}</CheckBoxLabelWrapper>}
              trueLabel={
                <CheckBoxLabelWrapper>
                  <StyledParagraph>{t('modals.submitJudgement.checkbox.true')}</StyledParagraph>
                </CheckBoxLabelWrapper>
              }
              checked={state.context.hasWinner}
              onChange={switchCheckbox}
            />
          </InlineToggleWrap>
          <WinnersSelection
            validationMessage={isValid}
            amountDistributed={amountDistributed}
            bountyFunding={bounty.totalFunding}
            filter={selectWorkerFilter}
            noBountyWinners={!state.context.hasWinner}
            winners={state.context.winners}
            addWinner={() => send('ADD_WINNER')}
            removeLastWinner={() => send('REMOVE_LAST_WINNER')}
            editWinner={(id, winner) => send('EDIT_WINNER', { payload: { winner, id } })}
          />

          <ModalDivider />

          <TextHuge bold>{t('modals.submitJudgement.slash.title')}</TextHuge>
          <TextMedium inter>{t('modals.submitJudgement.slash.description')}</TextMedium>
          <SlashedSelection
            filter={selectWorkerFilter}
            removeLastSlashed={() => send('REMOVE_LAST_SLASHED')}
            addSlashed={() => send('ADD_SLASHED')}
            editSlashed={(id, rejected) => send('EDIT_REJECTED', { payload: { id, rejected } })}
            slashed={state.context.rejected}
          />
        </ModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!!isValid} size="medium" onClick={() => send('NEXT')}>
          {t('modals.submitJudgement.authorizeTransaction')}
        </ButtonPrimary>
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
