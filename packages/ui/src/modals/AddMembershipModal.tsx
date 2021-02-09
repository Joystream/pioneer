import React, { useState } from 'react'
import { ButtonPrimaryMedium } from '../components/buttons'
import { TextInput, Label } from '../components/Form'
import { Modal, ModalFooter, ModalHeader, ScrolledModalBody } from '../components/Modal'
import { filterAccount, SelectAccount } from '../components/selects/AccountSelectTemplate/SelectAccount'
import { Account } from '../hooks/types'
import { Row } from './common'

interface MembershipModalProps {
  onClose: () => void
}

type ModalState = 'Create' | 'Authorize'

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const [state] = useState<ModalState>('Create')
  const [rootAccount, setRootAccount] = useState<Account | undefined>()
  const [controllerAccount, setControllerAccount] = useState<Account | undefined>()

  const onClick = () => {
    /**/
  }

  if (state === 'Create') {
    return (
      <Modal>
        <ModalHeader onClick={onClose} title="Add membership" />
        <ScrolledModalBody>
          <Row>
            <Label>I was referred by a member Yes/No</Label>
            <TextInput type="text" value="Select Member or type a member" />
            <p>Please fill in all the details below.</p>
          </Row>

          <Row>
            <Label>Root account (?) *</Label>
            <SelectAccount filter={filterAccount(controllerAccount)} onChange={setRootAccount} />
          </Row>

          <Row>
            <Label>Controller account (?) *</Label>
            <SelectAccount filter={filterAccount(rootAccount)} onChange={setControllerAccount} />
          </Row>

          <Row>
            <Label>Member Name (?) *</Label>
            <TextInput type="text" />
          </Row>

          <Row>
            <Label>Membership handle (?) *</Label>
            <TextInput type="text" />
          </Row>

          <Row>
            <Label>About Member *</Label>
            <TextInput type="text" />
          </Row>

          <Row>
            <Label>Member Avatar *</Label>
            <TextInput type="text" />
          </Row>
        </ScrolledModalBody>
        <ModalFooter>
          <Label>
            <TextInput type="checkbox" />I agree to our Terms of Service and Privacy Policy.
          </Label>
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
