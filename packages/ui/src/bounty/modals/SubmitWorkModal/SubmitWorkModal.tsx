import { createType } from '@joystream/types'
import { useMachine } from '@xstate/react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { BountyRoutes } from '@/bounty/constants'
import { submitWorkMetadataFactory } from '@/bounty/modals/AddBountyModal/helpers'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal'
import {
  submitWorkMachine,
  SubmitWorkModalMachineState,
  SubmitWorkStates,
} from '@/bounty/modals/SubmitWorkModal/machine'
import { SubmitWorkModalCall } from '@/bounty/modals/SubmitWorkModal/types'
import { SuccessTransactionModal } from '@/bounty/modals/SuccessTransactionModal'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputContainer, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader, Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const SubmitWorkModal = () => {
  const { hideModal, modalData } = useModal<SubmitWorkModalCall>()
  const { active: activeMember } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const [state, send, service] = useMachine(submitWorkMachine)
  const history = useHistory()
  const [isValidNext, setValidNext] = useState(false)
  const { allAccounts } = useMyAccounts()
  const { api, isConnected } = useApi()

  if (!service.initialized) {
    service.start()
  }
  useEffect(() => {
    if (state.context.workTitle && state.context.workDescription !== '') {
      setValidNext(true)
    } else {
      setValidNext(false)
    }
  })
  const transaction = useMemo(() => {
    const entryId = modalData.bounty.entries?.find((entryId) => entryId.id === 'id')
    if (api && isConnected && activeMember) {
      return api.tx.bounty.submitWork(
        createType('u64', Number(activeMember?.id || 0)),
        createType('u32', Number(modalData.bounty.id || 0)),
        createType('u32', Number(entryId || 0)),
        submitWorkMetadataFactory(state as SubmitWorkModalMachineState)
      )
    }
  }, [JSON.stringify(activeMember), isConnected])

  const goToCurrentBounties = useCallback(() => {
    history.push(generatePath(BountyRoutes.currentBounties))
  }, [])

  if (!activeMember || !transaction) {
    return null
  }
  if (state.matches(SubmitWorkStates.transaction)) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <AuthorizeTransactionModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        description={t('modals.submitWork.authorizeDescription')}
        buttonLabel={t('modals.submitWork.button.submitWork')}
      />
    )
  }

  if (state.matches(SubmitWorkStates.success)) {
    return (
      <SuccessTransactionModal
        buttonLabel={t('modals.bountyCancel.success.button')}
        message={t('modals.bountyCancel.success.message')}
        onButtonClick={goToCurrentBounties}
        onClose={hideModal}
      />
    )
  }

  if (state.matches(SubmitWorkStates.error)) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {t('modals.bountyCancel.error')}
      </FailureModal>
    )
  }

  if (state.matches(SubmitWorkStates.cancel)) {
    return <FailureModal onClose={hideModal}>{t('common:modals.transactionCanceled')}</FailureModal>
  }

  const workTitleValidation =
    state.context.workTitle.length > 70
      ? t('modals.submitWork.validation.maxLengthMessage')
      : t('modals.submitWork.validation.max70')

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader title={t('modals.submitWork.title')} onClick={hideModal} />
      <ModalBody>
        {state.matches(SubmitWorkStates.generalParameters) && (
          <RowGapBlock gap={24}>
            <Row>
              <RowGapBlock gap={8}>
                <h4>{t('modals.submitWork.subtitle')}</h4>
              </RowGapBlock>
            </Row>
            <Container
              disabled
              label="Bounty ID"
              tooltipText={t('modals.submitWork.submitWorkInput.bountyId')}
              inputSize="l"
            >
              <TextBig value bold>
                {modalData.bounty.id}
              </TextBig>
            </Container>
            <Row>
              <RowGapBlock gap={20}>
                <SelectedMember
                  disabled
                  member={activeMember}
                  label={t('modals.submitWork.submitWorkInput.memberId')}
                />
                <InputComponent
                  id="field-work-title"
                  required
                  inputSize="m"
                  label={t('modals.submitWork.submitWorkInput.workTitle')}
                  message={workTitleValidation}
                  validation={state.context.workTitle.length > 70 ? 'invalid' : undefined}
                >
                  <InputText
                    id="field-work-title"
                    value={state.context.workTitle}
                    onChange={(e) => send('SET_WORK_TITLE', { workTitle: e.target.value })}
                    placeholder={t('modals.submitWork.submitWorkInput.workTitlePlaceholder')}
                  />
                </InputComponent>
                <InputComponent
                  id="field-description"
                  label={t('modals.submitWork.submitWorkInput.entryDescription')}
                  required
                >
                  <CKEditor
                    id="field-description"
                    minRows={3}
                    onChange={(event, editor) => send('SET_WORK_DESCRIPTION', { workDescription: editor.getData() })}
                    onReady={(editor) => editor.setData(state.context.workDescription || '')}
                  />
                </InputComponent>
              </RowGapBlock>
            </Row>
          </RowGapBlock>
        )}
      </ModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          <ButtonPrimary disabled={!isValidNext} onClick={() => send('NEXT')} size="medium">
            {t('modals.submitWork.button.submitWork')}
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}

const Container = styled(InputComponent)`
  ${InputContainer} {
    padding-left: 16px;
  }
`
