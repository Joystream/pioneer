import React from 'react'

import { FailureIcon } from '../../../common/components/icons/FailureIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultText } from '../../../common/components/Modal'
import { BaseMember } from '../../types'

interface Props {
  onClose: () => void
  member: BaseMember
}

export const UpdateMembershipFailureModal = ({ onClose, member }: Props) => (
  <Modal modalSize="xs" modalHeight="s" onClose={onClose}>
    <ModalHeader title="" onClick={onClose} modalHeaderSize="s" />
    <ResultModalBody>
      <FailureIcon />
      <ModalTitle as="h4">
        <span className="red-title">Oh no!</span> Failure
      </ModalTitle>
      <ResultText>There was a problem with creating a membership for {member.name}.</ResultText>
    </ResultModalBody>
  </Modal>
)
