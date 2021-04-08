import React, { ReactNode } from 'react'

import { TransactionStatus } from '../hooks/useSignAndSendTransaction'

import { Modal, ModalHeader } from './Modal'
import { WaitModal } from './WaitModal'

interface TransactionModalProps {
  children: ReactNode
  status: TransactionStatus
  onClose: () => void
}

export const TransactionModal = ({ status, onClose, children }: TransactionModalProps) => {
  if (status === 'READY') {
    return (
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize transaction" />
        {children}
      </Modal>
    )
  }

  if (status === 'EXTENSION') {
    return (
      <WaitModal
        onClose={onClose}
        title="Waiting for the extension"
        description="Please, sign the transaction using external signer app."
      />
    )
  }

  if (status === 'PENDING') {
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
