import React from 'react'

import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

import { ButtonPrimary } from './buttons'
interface Props {
  onClose: () => void
  text: string
}

export const SuccessModal = ({ onClose, text }: Props) => (
  <Modal onClose={onClose} modalSize="m">
    <ModalHeader onClick={onClose} title="Success!" icon={<SuccessIcon />} />
    <ModalBody>
      <TextMedium>{text}</TextMedium>
    </ModalBody>

    <ModalFooter>
      <ButtonPrimary onClick={onClose} size="medium">
        Close
      </ButtonPrimary>
    </ModalFooter>
  </Modal>
)
