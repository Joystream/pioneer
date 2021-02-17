import React from 'react'
import { Member } from '../../common/types'
import { SuccessIcon } from '../../components/icons'
import { Modal, ModalHeader, SuccessModalBody } from '../../components/Modal'

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
