import React from 'react'

import { Loader } from './icons'
import { WaitingIcon } from './icons/WaitingIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultTextWhite } from './Modal'

export interface WaitModalProps {
  onClose: () => void
  title: string
  description: string
}

export const WaitModal = ({ onClose, title, description }: WaitModalProps) => (
  <Modal modalSize="xs" modalHeight="s" isDark onClose={onClose}>
    <ModalHeader icon={<Loader />} title="" onClick={onClose} modalHeaderSize="s" />
    <ResultModalBody>
      <WaitingIcon />
      <ModalTitle as="h4">{title}</ModalTitle>
      <ResultTextWhite>{description}</ResultTextWhite>
    </ResultModalBody>
  </Modal>
)
