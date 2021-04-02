import React from 'react'
import { BaseMember } from '../../common/types'
import { FailureIcon } from '../../components/icons/FailureIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultText } from '../../components/Modal'

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
