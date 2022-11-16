import React, { useCallback } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { FailureModal } from '@/common/components/FailureModal'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { WithdrawCandidacyModalCall } from '@/council/modals/WithdrawCandidacyModal/types'
import { WithdrawWarningModal } from '@/council/modals/WithdrawCandidacyModal/WithdrawWarningModal'

import { machine } from './machine'

export const WithdrawCandidacyModal = () => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<WithdrawCandidacyModalCall>()
  const { member } = modalData
  const onClose = hideModal

  const [state, send] = useMachine(machine)
  const onNext = useCallback(() => send('NEXT'), [send])

  if (state.matches('warning')) {
    return <WithdrawWarningModal onNext={onNext} onClose={onClose} />
  }

  if (state.matches('transaction')) {
    return (
      <SignTransactionModal
        transaction={api?.tx.council.withdrawCandidacy(member.id)}
        signer={member.controllerAccount}
        service={state.children.transaction}
      >
        <TextMedium>You intend to withdraw your candidacy.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('success')) {
    return (
      <Modal onClose={onClose} modalSize="m">
        <ModalHeader onClick={onClose} title="Success!" />
        <ModalBody>
          <TextMedium>You have successfully withdrawn your candidacy.</TextMedium>
        </ModalBody>
      </Modal>
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal events={state.context.transactionEvents} onClose={onClose}>
        There was a problem while withdrawing your candidacy.
      </FailureModal>
    )
  }

  return null
}
