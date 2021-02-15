import React from 'react'
import { SuccessIcon } from '../../components/icons'
import { ModalHeader, Modal, SuccessModalBody } from '../../components/Modal'

import { Params } from './MembershipFormModal'

interface Props {
  onClose: () => void
  params: Params
}

export function AddMembershipSuccessModal({ onClose }: Props) {
  return (
    <Modal modalSize="m" modalHeight="s">
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <SuccessModalBody>OK</SuccessModalBody>
    </Modal>
  )
}
