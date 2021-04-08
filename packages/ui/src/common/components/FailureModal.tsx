import React, { ReactNode } from 'react'

import { FailureIcon } from './icons/FailureIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultText } from './Modal'

export interface FailureModalProps {
  children: ReactNode
  onClose: () => void
}

export const FailureModal = ({ children, onClose }: FailureModalProps) => {
  return (
    <Modal modalSize="xs" modalHeight="s" onClose={onClose}>
      <ModalHeader title="" onClick={onClose} modalHeaderSize="s" />
      <ResultModalBody>
        <FailureIcon />
        <ModalTitle as="h4">
          <span className="red-title">Oh no!</span> Failure
        </ModalTitle>
        <ResultText>{children}</ResultText>
      </ResultModalBody>
    </Modal>
  )
}
