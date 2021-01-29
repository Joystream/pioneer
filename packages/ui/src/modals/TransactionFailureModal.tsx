import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../components/modal'
import { TokenValue } from '../components/TokenValue'
import { ButtonPrimaryMedium } from '../components/buttons/Buttons'

export function TransactionFailureModal() {
  return (
    <Modal>
      <ModalHeader
        onClick={() => {
          /**/
        }}
        title="Recover failure"
      />
      <ModalBody>
        You have not transferred <TokenValue value={100} /> balance...
      </ModalBody>
      <ModalFooter>
        <ButtonPrimaryMedium>Accept and close {'->'}</ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}
