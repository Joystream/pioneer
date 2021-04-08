import React from 'react'

import { FailureIcon } from './icons/FailureIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultText } from './Modal'

export interface FailureModalProps {
  message: string
  onClose: () => void
}

export const FailureModal = ({ message, onClose }: FailureModalProps) => {
  return (
    <Modal modalSize="xs" modalHeight="s" onClose={onClose}>
      <ModalHeader title="" onClick={onClose} modalHeaderSize="s" />
      <ResultModalBody>
        <FailureIcon />
        <ModalTitle as="h4">
          <span className="red-title">Oh no!</span> Failure
        </ModalTitle>
        <ResultText>{message}</ResultText>
      </ResultModalBody>
    </Modal>
  )
}
