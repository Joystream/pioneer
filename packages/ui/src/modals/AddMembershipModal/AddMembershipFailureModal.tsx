import React from 'react'
import { SuccessIcon } from '../../components/icons'
import { Modal, ModalHeader, SuccessModalBody } from '../../components/Modal'

import { Member } from './MembershipFormModal'

interface Props {
  onClose: () => void
  params: Member
}

export function AddMembershipFailureModal({ onClose }: Props) {
  return (
    <Modal modalSize={'s'}>
      <ModalHeader onClick={onClose} title="Failure" icon={<SuccessIcon />} />
      <SuccessModalBody>NOT OK</SuccessModalBody>
    </Modal>
  )
}
