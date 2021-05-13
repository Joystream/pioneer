import React from 'react'

import { Modal, ModalBody, ModalFooter, Row } from '@/common/components/Modal'

import { ButtonPrimary } from '../../../common/components/buttons'

interface Props {
  onClose: () => void
}

export const WithdrawApplicationSuccessModal = ({ onClose }: Props) => (
  <Modal onClose={onClose} modalSize="s">
    <ModalBody>
      <Row>Application withdrawn.</Row>
    </ModalBody>
    <ModalFooter>
      <ButtonPrimary onClick={onClose}>Return</ButtonPrimary>
    </ModalFooter>
  </Modal>
)
