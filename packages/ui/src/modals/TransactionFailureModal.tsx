import React from 'react'
import { ButtonPrimaryMedium } from '../components/buttons/Buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../components/modal'
import { TokenValue } from '../components/TokenValue'

export function TransactionFailureModal() {
  return (
    <Modal>
      <ModalHeader
        onClick={() => {
          /**/
        }}
        title="Fail"
        icon={'FailIcon'}
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
