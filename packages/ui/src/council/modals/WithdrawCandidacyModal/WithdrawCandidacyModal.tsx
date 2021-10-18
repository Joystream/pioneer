import { useMachine } from '@xstate/react'
import React, { useCallback } from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { WithdrawCandidacyModalCall } from '@/council/modals/WithdrawCandidacyModal/types'
import { WithdrawSignModal } from '@/council/modals/WithdrawCandidacyModal/WithdrawSignModal'
import { WithdrawWarningModal } from '@/council/modals/WithdrawCandidacyModal/WithdrawWarningModal'

import { machine } from './machine'

export const WithdrawCandidacyModal = () => {
  const { hideModal, modalData } = useModal<WithdrawCandidacyModalCall>()
  const { member } = modalData
  const onClose = hideModal
  const [state, send] = useMachine(machine)
  const onNext = useCallback(() => send('NEXT'), [send])

  if (state.matches('warning')) {
    return <WithdrawWarningModal onNext={onNext} onClose={onClose} />
  }

  if (state.matches('transaction')) {
    return <WithdrawSignModal onClose={onClose} service={state.children.transaction} member={member} />
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
    return <FailureModal onClose={onClose}>There was a problem with withdrawing your candidacy.</FailureModal>
  }

  return null
}
