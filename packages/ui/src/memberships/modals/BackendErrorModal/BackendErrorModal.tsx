import React, { FC } from 'react'

import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { Warning } from '@/common/components/Warning'

type BackendErrorModalProps = {
  onClose: () => void
}

export const BackendErrorModal: FC<BackendErrorModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Unexpected error" />
      <ModalBody>
        <Warning
          content="There's been an unexpected error when communicating with notifications service. Please try again later."
          isClosable={false}
        />
      </ModalBody>
    </Modal>
  )
}
