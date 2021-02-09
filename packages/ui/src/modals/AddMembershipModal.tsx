import React, { useState } from 'react'
import { ButtonPrimaryMedium } from '../components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../components/Modal'
import { SelectAccount } from '../components/selects/AccountSelectTemplate/SelectAccount'
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
          <Row>
            <label>I was referred by a member Yes/No</label>
            <input type="text" value="Select Member or type a member" />
            <p>Please fill in all the details below.</p>
          </Row>

          <Row>
            <label>Root account (?) *</label>
            <SelectAccount options={[]} onChange={console.log} />
          </Row>

          <Row>
            <label>Controller account (?) *</label>
            <SelectAccount options={[]} onChange={console.log} />
          </Row>

          <Row>
            <label>Member Name (?) *</label>
            <input type="text" />
          </Row>

          <Row>
            <label>Membership handle (?) *</label>
            <input type="text" />
          </Row>

          <Row>
            <label>About Member *</label>
            <input type="text" />
          </Row>

          <Row>
            <label>Member Avatar *</label>
            <input type="text" />
          </Row>
        </ModalBody>
        <ModalFooter>
          <label>
            <input type="checkbox" />I agree to our Terms of Service and Privacy Policy.
          </label>
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
