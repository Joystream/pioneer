import React from 'react'

import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface Props {
  onClose: () => void
  text: string
}

export const SuccessModal = ({ onClose, text }: Props) => (
  <Modal onClose={onClose} modalSize="m">
    <ModalHeader onClick={onClose} title="Success!" />
    <ModalBody>
      <TextMedium>{text}</TextMedium>
    </ModalBody>
  </Modal>
)
