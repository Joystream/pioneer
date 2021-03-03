import React from 'react'
import { Member } from '../../common/types'
import { FailureIcon } from '../../components/icons/FailureIcon'
import { CloseSmallModalButton, Modal, ModalTitle, ResultModalBody, ResultText } from '../../components/Modal'

interface Props {
  onClose: () => void
  member: Member
}

export const AddMembershipFailureModal = ({ onClose, member }: Props) => (
  <Modal modalSize="xs" modalHeight="s">
    <ResultModalBody>
      <CloseSmallModalButton onClick={onClose} />
      <FailureIcon />
      <ModalTitle>
        <span className="red-title">Oh no!</span> Failure
      </ModalTitle>
      <ResultText size={2}>There was a problem with crating a membership for {member.name}.</ResultText>
    </ResultModalBody>
  </Modal>
)
