import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface Props {
  onClose: () => void
}

export const ChangeRoleSuccessModal = ({ onClose }: Props) => (
  <Modal onClose={onClose} modalSize="s">
    <ModalHeader title="Success!" onClick={onClose} />
    <ModalBody>
      <TextMedium>You have successfully changed the role.</TextMedium>
    </ModalBody>
    <ModalFooter>
      <ButtonPrimary onClick={onClose}>Return</ButtonPrimary>
    </ModalFooter>
  </Modal>
)
