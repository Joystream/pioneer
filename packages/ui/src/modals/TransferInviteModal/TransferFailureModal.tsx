import React from 'react'
import { FailureIcon } from '../../components/icons/FailureIcon'
import { CloseSmallModalButton, Modal, ModalTitle, ResultModalBody, ResultText } from '../../components/Modal'

interface Props {
  onClose: () => void
}

export const TransferFailureModal = ({ onClose }: Props) => (
  <Modal modalSize="xs" modalHeight="s" onClose={onClose}>
    <ResultModalBody>
      <CloseSmallModalButton onClick={onClose} />
      <FailureIcon />
      <ModalTitle>
        <span className="red-title">Oh no!</span> Failure
      </ModalTitle>
      <ResultText size={2}>There was a problem transfering your invites.</ResultText>
    </ResultModalBody>
  </Modal>
)
