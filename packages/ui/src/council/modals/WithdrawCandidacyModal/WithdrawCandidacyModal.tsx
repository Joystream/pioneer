import { useMachine } from '@xstate/react'
import React, { useCallback } from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { WithdrawSignModal } from '@/council/modals/WithdrawCandidacyModal/WithdrawSignModal'
import { WithdrawWarningModal } from '@/council/modals/WithdrawCandidacyModal/WithdrawWarningModal'
import { Member } from '@/memberships/types'

import { machine } from './machine'

interface Props {
  onClose: () => void
  member: Member
}

export const WithdrawCandidacyModal = ({ onClose, member }: Props) => {
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
