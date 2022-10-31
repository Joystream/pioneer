import BN from 'bn.js'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import * as Yup from 'yup'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
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
import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputContainer, Label, ToggleCheckbox } from '@/common/components/forms'
import { Modal, ModalDivider, ModalHeader, ModalTransactionFooter, ScrolledModalBody } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextHuge, TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useSchema } from '@/common/hooks/useSchema'
import { createType } from '@/common/model/createType'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

interface ISchema {
  totalFunding: BN
  amountDistributed: BN
}

const schema = Yup.object().shape({
  hasWinner: Yup.boolean(),
  winners: Yup.array().test((value, context) => {
    if (!context.parent.hasWinner) {
      return true
    }

    const { amountDistributed, totalFunding } = context.options.context as ISchema

    if (!!value?.length && value?.some((winner) => !winner.winner)) {
      return context.createError({ message: 'modals.submitJudgement.validation.pickWinner' })
    }

    if (value?.some(({ reward }) => reward === 0)) {
      return context.createError({ message: 'modals.submitJudgement.validation.winnerNoReward' })
    }

    if (totalFunding.lt(amountDistributed)) {
      return context.createError({ message: 'modals.submitJudgement.validation.amountTooHigh' })
    }

    if (totalFunding.gt(amountDistributed)) {
      return context.createError({ message: 'modals.submitJudgement.validation.amountTooLow' })
    }

    return true
  }),
  rejected: Yup.array().test((value, context) => {
    if (value?.length && value.some((rejected) => typeof rejected.rejected === 'undefined')) {
      return context.createError({ message: 'modals.submitJudgement.validation.noSlashedWorkerSelected' })
    }

    return true
  }),
  rationale: Yup.string().required('modals.submitJudgement.validation.rationaleMissing'),
})

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
  const { errors, isValid, setContext } = useSchema<ISchema>({ ...state.context }, schema)

  const amountDistributed = useMemo(
    () => state.context.winners?.reduce((prev, current) => prev.add(current.reward ?? BN_ZERO), BN_ZERO) ?? BN_ZERO,
    [state.context.winners]
  )

  useEffect(() => {
    setContext({
      totalFunding: bounty.totalFunding,
      amountDistributed: amountDistributed,
    })
  }, [amountDistributed])

  if (!service.initialized) {
    service.start()
  }

  const validEntriesMembersIds = useMemo(
    () => bounty.entries?.filter((entry) => entry.hasSubmitted).map((entry) => entry.worker.id) ?? [],
    [bounty]
  )

  const switchCheckbox = useCallback(
    (isSet: boolean) => {
      if (!isSet) {
        send('CLEAN_WINNERS')
      }

      if (isSet && !state.context.hasWinner) {
        send('ADD_WINNER')
      }

      send('SET_HAS_WINNER', { hasWinner: isSet })
    },
    [state.context.hasWinner]
  )

  const selectWorkerFilter = useCallback(
    (member: Member) => {
      const isWorker = bounty.entries?.some((entry) => entry.worker.id === member.id)
      if (!isWorker) {
        return false
      }

      const isWinner = state.context.winners
        ?.filter((winner) => winner.winner && winner.reward)
        .some((winner) => winner?.winner?.id === member.id)
      const isSlashed = state.context.rejected
        ?.filter((loser) => !!loser.rejected)
        .some((loser) => loser.rejected?.id === member.id)

      return !(isWinner || isSlashed)
    },
    [state.context.winners, state.context.rejected]
  )

  const transaction = useMemo(() => {
    if (api && isConnected && activeMember) {
      const validWinners = state.context.winners?.filter(
        (winner) => winner.winner && winner.reward
      ) as Required<BountyWinner>[]
      const winnersApi = validWinners.map(
        ({ winner, reward }) =>
          [
            createType('EntryId', Number(bounty.entries?.find((entry) => entry.worker.id === winner.id)?.id) ?? 0),
            createType('OracleWorkEntryJudgment', {
              Winner: { reward: createType('u128', reward) },
            }),
          ] as const
      )

      const validRejections = state.context.rejected?.filter(
        (rejection) => rejection.rejected
      ) as Required<BountyRejected>[]
      const rejectedApi = validRejections.map(
        (loser) =>
          [
            createType(
              'EntryId',
              Number(bounty.entries?.find((entry) => entry.worker.id === loser.rejected.id)?.id) ?? 0
            ),
            createType('OracleWorkEntryJudgment', {
              Rejected: null,
            }),
          ] as const
      )

      const judgments = [...winnersApi, ...rejectedApi]

      return api?.tx.bounty.submitOracleJudgment(
        { Member: createType('MemberId', Number(activeMember?.id || 0)) },
        createType('BountyId', Number(bounty.id || 0)),
        createType('OracleJudgment', new Map(judgments)),
        state.context.rationale ?? ''
      )
    }
  }, [api, isConnected, bounty, state.context])

  useTransactionFee(activeMember?.controllerAccount, () => transaction, [transaction])

  useEffect(() => {
    if (api && transaction && activeMember && state.matches(SubmitJudgementStates.requirementsVerification)) {
      send('NEXT')
    }
  }, [api, transaction])

  useEffect(() => {
    const rewardMod = bounty.totalFunding.toNumber() % (state.context?.winners?.length ?? 1)
    const reward = Math.floor(bounty.totalFunding.toNumber() / (state.context?.winners?.length ?? 1))

    state.context.winners?.forEach((winner, index) => {
      send('EDIT_WINNER', {
        payload: {
          id: winner.id,
          winner: { reward: index === 0 ? reward + rewardMod : reward },
        },
      })
    })
  }, [state.context.winners?.length])

  if (!activeMember || !transaction || !api) {
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
          <RowGapBlock>
            <InlineToggleWrap>
              <Label>{t('modals.submitJudgement.checkbox.label')}</Label>
              <ToggleCheckbox
                falseLabel={<CheckBoxLabelWrapper>{t('modals.submitJudgement.checkbox.false')}</CheckBoxLabelWrapper>}
                trueLabel={
                  <CheckBoxLabelWrapper>
                    <StyledParagraph>{t('modals.submitJudgement.checkbox.true')}</StyledParagraph>
                  </CheckBoxLabelWrapper>
                }
                checked={state.context.hasWinner ?? true}
                onChange={switchCheckbox}
              />
            </InlineToggleWrap>
            {!isValid && !state.context.hasWinner && <TextMedium error>{t(errors[0]?.message ?? '')}</TextMedium>}
          </RowGapBlock>
          <WinnersSelection
            validIds={validEntriesMembersIds}
            validationMessage={errors[0]?.message ?? ''}
            amountDistributed={amountDistributed}
            bountyFunding={bounty.totalFunding}
            filter={selectWorkerFilter}
            noBountyWinners={!state.context.hasWinner}
            winners={state.context.winners ?? []}
            addWinner={() => send('ADD_WINNER')}
            removeLastWinner={() => send('REMOVE_LAST_WINNER')}
            editWinner={(id, winner) => send('EDIT_WINNER', { payload: { winner, id } })}
          />

          <ModalDivider />

          <TextHuge bold>{t('modals.submitJudgement.slash.title')}</TextHuge>
          <TextMedium inter>{t('modals.submitJudgement.slash.description')}</TextMedium>
          <SlashedSelection
            filter={selectWorkerFilter}
            validIds={validEntriesMembersIds}
            removeLastSlashed={() => send('REMOVE_LAST_SLASHED')}
            addSlashed={() => send('ADD_SLASHED')}
            editSlashed={(id, rejected) => send('EDIT_REJECTED', { payload: { id, rejected } })}
            slashed={state.context.rejected ?? []}
          />
          <ModalDivider />
          <InputComponent label="Rationale" required inputSize="auto" id="field-rationale">
            <CKEditor
              id="field-rationale"
              minRows={5}
              onChange={(event, editor) => send('SET_RATIONALE', { rationale: editor.getData() })}
              onReady={(editor) => editor.setData(state.context.rationale ?? '')}
            />
          </InputComponent>
        </ModalContainer>
      </ScrolledModalBody>
      <ModalTransactionFooter
        next={{
          disabled: !isValid,
          onClick: () => send('NEXT'),
          label: t('modals.submitJudgement.authorizeTransaction'),
        }}
      />
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
