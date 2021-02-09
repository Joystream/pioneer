import React, { useState } from 'react'
import { ButtonPrimaryMedium } from '../components/buttons'
import { Label, Switch, TextInput } from '../components/Form'
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
  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [about, setAbout] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isReferred, setIsReferred] = useState(true)

  const onClick = () => {
    /**/
  }

  if (state === 'Create') {
    return (
      <Modal>
        <ModalHeader onClick={onClose} title="Add membership" />
        <ScrolledModalBody>
          <Row>
            <Label>
              I was referred by a member:{' '}
              <Switch initialState={isReferred} textOff="No" textOn={'Yes'} onChange={setIsReferred} />
            </Label>
            <TextInput type="text" value="Select Member or type a member" disabled={!isReferred} />
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
            <TextInput type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </Row>

          <Row>
            <Label>Membership handle (?) *</Label>
            <TextInput type="text" value={handle} onChange={(event) => setHandle(event.target.value)} />
          </Row>

          <Row>
            <Label>About Member *</Label>
            <TextInput type="text" value={about} onChange={(event) => setAbout(event.target.value)} />
          </Row>

          <Row>
            <Label>Member Avatar *</Label>
            <TextInput type="text" value={avatar} onChange={(event) => setAvatar(event.target.value)} />
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
