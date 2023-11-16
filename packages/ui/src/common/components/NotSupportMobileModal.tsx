import React from 'react'

import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface Props {
  onClose: () => void
}

export const NotSupportMobileModal = ({ onClose }: Props) => (
  <Modal onClose={onClose} modalSize="xs">
    <ModalHeader onClick={onClose} title="" />
    <ModalBody>
      <TextMedium>This action requires a browser extension, please visit this page from a desktop browser.</TextMedium>
    </ModalBody>
  </Modal>
)
