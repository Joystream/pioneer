import { createType } from '@joystream/types'
import { Bytes } from '@polkadot/types'
import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Account } from '@/accounts/types'
import { SuccessModal } from '@/bounty/modals/AddBountyModal/components/SuccessModal'
import { createBountyMetadataFactory, submitWorkMetadataFactory } from '@/bounty/modals/AddBountyModal/helpers'
import { AddBountyModalMachineState } from '@/bounty/modals/AddBountyModal/machine'
import { SignTransactionModal } from '@/bounty/modals/SubmitWorkModal/components/SignTransactionModal'
import {
  submitWorkMachine,
  SubmitWorkModalMachineState,
  SubmitWorkStates,
} from '@/bounty/modals/SubmitWorkModal/machine'
import { SubmitWorkModalCall } from '@/bounty/modals/SubmitWorkModal/types'
import { Bounty } from '@/bounty/types/Bounty'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputContainer, InputNotificationMessage, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader, Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface Props {
  workDescription?: string
  workTitle?: string
}

export const SubmitWorkModal = ({ workDescription, workTitle }: Props) => {
  const { hideModal, modalData } = useModal<SubmitWorkModalCall>()
  const { active: activeMember } = useMyMemberships()
  const { t } = useTranslation('bounty')
  const [state, send, service] = useMachine(submitWorkMachine)
  const [isValidNext, setValidNext] = useState(false)
  const { api } = useApi()
  // const balance = useBalance(activeMember?.controllerAccount)
  // const bountyApi = api?.consts.bounty

  if (!service.initialized) {
    service.start()
  }

  const transaction = useMemo(() => {
    const entryId = modalData.bounty.entries?.find((entryId) => entryId.id === 'id')
    return api?.tx.bounty.submitWork(
      createType('u64', Number(activeMember?.id || 0)),
      createType('u32', Number(modalData.bounty.id || 0)),
      createType('u32', Number(entryId || 0)),
      submitWorkMetadataFactory(state as SubmitWorkModalMachineState)
    )
  }, [])

  if (state.matches(SubmitWorkStates.transaction)) {
    return (
      <SignTransactionModal
        onClose={hideModal}
        transaction={transaction}
        service={state.children['transaction']}
        signer={activeMember}
      />
    )
  }

  if (state.matches(SubmitWorkStates.success)) {
    return <SuccessModal onClose={hideModal} />
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

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader title="Submit work" onClick={hideModal} />
      <ModalBody>
        {state.matches(SubmitWorkStates.generalParameters) && (
          <RowGapBlock gap={24}>
            <Row>
              <RowGapBlock gap={8}>
                <h4>Submit work</h4>
              </RowGapBlock>
            </Row>
            <Container disabled label="Bounty ID" tooltipText="test" inputSize="l">
              <TextBig value bold>
                {modalData.bounty.id}
              </TextBig>
            </Container>
            <Row>
              <RowGapBlock gap={20}>
                <SelectedMember disabled member={activeMember} label="Member Id" />
                <InputComponent id="field-description" required inputSize="m" label="Work Title">
                  <InputText
                    id="field-title"
                    onChange={(e) => send('SET_WORK_TITLE', { workTitle: e.target.value })}
                    placeholder="Type"
                  />
                </InputComponent>
                <InputComponent id="field-description" inputSize="auto" label="Bounty description" required>
                  <CKEditor
                    id="field-description"
                    minRows={3}
                    onChange={(event, editor) => send('SET_WORK_DESCRIPTION', { workDescription: editor.getData() })}
                    onReady={(editor) => editor.setData(workDescription || '')}
                  />
                </InputComponent>
              </RowGapBlock>
            </Row>
          </RowGapBlock>
        )}
      </ModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          {/*<ButtonPrimary disabled={!isValidNext} onClick={() => send('NEXT')} size="medium">*/}
          {/*  Submit Work*/}
          {/*</ButtonPrimary>*/}
          <ButtonPrimary onClick={() => send('NEXT')} size="medium">
            Submit Work
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
