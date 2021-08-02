import { useActor } from '@xstate/react'
import React, { ReactNode } from 'react'
import { ActorRef } from 'xstate'

import { Modal, ModalHeader } from './Modal'
import { WaitModal } from './WaitModal'

export interface TransactionModalProps {
  children: ReactNode
  onClose: () => void
  service: ActorRef<any>
  title?: string
}

export const TransactionModal = ({ onClose, children, service, title }: TransactionModalProps) => {
  console.log("TMOD'|,", service)
  const [state] = useActor(service)

  if (state.matches('prepare')) {
    return (
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        <ModalHeader onClick={onClose} title={title ?? 'Authorize transaction'} />
        {children}
      </Modal>
    )
  }

  if (state.matches('signWithExtension')) {
    return (
      <WaitModal
        onClose={onClose}
        title="Waiting for the extension"
        description="Please, sign the transaction using external signer app."
      />
    )
  }

  if (state.matches('pending')) {
    return (
      <WaitModal
        onClose={onClose}
        title="Pending transaction"
        description="We are waiting for your transaction to be mined. It can takes Lorem ipsum deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim."
      />
    )
  }

  return null
}
