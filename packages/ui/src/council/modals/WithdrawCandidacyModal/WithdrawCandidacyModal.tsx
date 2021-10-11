import { useMachine } from '@xstate/react'
import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { ModalBody, ModalFooter } from '@/common/components/Modal'
import { useModal } from '@/common/hooks/useModal'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { WithdrawWarningModal } from '@/council/modals/WithdrawCandidacyModal/WithdrawWarningModal'

import { machine } from './machine'

export const WithdrawCandidacyModal = () => {
  const { hideModal } = useModal()
  const [state, send] = useMachine(machine)
  const onNext = useCallback(() => send('NEXT'), [send])

  if (state.matches('warning')) {
    return <WithdrawWarningModal onNext={onNext} onClose={hideModal} />
  }

  if (state.matches('transaction')) {
    return (
      <TransactionModal onClose={hideModal} service={state.children.transaction}>
        <ModalBody>
          <div>You intend to withdraw your candidacy</div>
        </ModalBody>
        <ModalFooter>
          <ButtonPrimary size="medium" disabled={false} onClick={() => undefined}>
            Sign and send
            <Arrow direction="right" />
          </ButtonPrimary>
        </ModalFooter>
      </TransactionModal>
    )
  }

  return null
}
