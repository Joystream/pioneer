import React from 'react'
import { SuccessIcon } from '../../components/icons'
import { Modal, ModalHeader, SuccessModalBody } from '../../components/Modal'

import { Params } from './MembershipFormModal'

interface Props {
  onClose: () => void
  params: Params
}

export function AddMembershipFailureModal({ onClose }: Props) {
  return (
    <Modal modalSize={'s'}>
      <ModalHeader onClick={onClose} title="Failure" icon={<SuccessIcon />} />
      <SuccessModalBody>NOT OK</SuccessModalBody>
    </Modal>
  )
}
