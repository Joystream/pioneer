import React, { useState } from 'react'
import { ButtonPrimaryMedium } from '../components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../components/Modal'
import { Row } from './common'

interface MembershipModalProps {
  onClose: () => void
}

type ModalState = 'Create' | 'Authorize'

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const [state] = useState<ModalState>('Create')

  const onClick = () => {
    /**/
  }

  if (state === 'Create') {
    return (
      <Modal>
        <ModalHeader onClick={onClose} title="Add membership" />
        <ModalBody>
          <Row>Row</Row>
        </ModalBody>
        <ModalFooter>
          <ButtonPrimaryMedium onClick={onClick} disabled>
            Create a Membership
          </ButtonPrimaryMedium>
        </ModalFooter>
      </Modal>
    )
  }

  return (
    <Modal>
      <ModalHeader onClick={onClose} title="Authorize transaction" />
    </Modal>
  )
}
