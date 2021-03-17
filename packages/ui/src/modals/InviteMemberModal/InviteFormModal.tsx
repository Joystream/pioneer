import React from 'react'
import { SelectAccount } from '../../components/account/SelectAccount'
import { Button } from '../../components/buttons'
import { Checkbox, Label, LabelLink, TextArea, TextInput } from '../../components/forms'
import { Help } from '../../components/Help'
import {
  ModalFooter,
  ModalHeader,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '../../components/Modal'
import { Text } from '../../components/typography'
import { Row } from '../common'

interface InviteProps {
  onClose: () => void
}

export const InviteFormModal = ({ onClose }: InviteProps) => {
  const onCreate = () => null

  return (
    <ScrolledModal modalSize="m" modalHeight="m" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Add membership" />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <Row>
            <Label>Inviting</Label>
            <SelectAccount onChange={() => null} />
          </Row>

          <Row>
            <Text size={2} dark>
              To invite a member please fill in all the details below.
            </Text>
          </Row>

          <Row>
            <Label isRequired>
              Root account <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
            </Label>
            <SelectAccount onChange={() => null} />
          </Row>

          <Row>
            <Label isRequired>
              Controller account <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
            </Label>
            <SelectAccount onChange={() => null} />
          </Row>

          <Row>
            <Label htmlFor="member-name" isRequired>
              Member Name
            </Label>
            <TextInput id="member-name" type="text" placeholder="Type" onChange={() => null} />
          </Row>

          <Row>
            <Label htmlFor="member-handle" isRequired>
              Membership handle
            </Label>
            <TextInput
              id="member-handle"
              type="text"
              placeholder="Type"
              onChange={() => null}
              //invalid={hasError('handle', errors)}
            />
            {/*<FieldError name="handle" errors={} />*/}
          </Row>

          <Row>
            <Label htmlFor="member-about">About Member</Label>
            <TextArea
              id="member-about"
              //value={about}
              placeholder="Type"
              rows={4}
              onChange={() => null}
            />
          </Row>

          <Row>
            <Label htmlFor="member-avatar">Member Avatar</Label>
            <TextInput
              id="member-avatar"
              type="text"
              placeholder="Image URL"
              //value={avatarURI}
              onChange={() => null}
              //invalid={hasError('avatarURI', errors)}
            />
            <Text size={3} italic={true}>
              Paste an URL of your avatar image. Text lorem ipsum.
            </Text>
            {/*<FieldError name="avatarURI" errors={errors} />*/}
          </Row>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <Label>
          <Checkbox id={'privacy-policy-agreement'} onChange={() => null}>
            <Text size={2} dark={true}>
              I agree to the{' '}
              <LabelLink href={'http://example.com/'} target="_blank">
                Terms of Service
              </LabelLink>{' '}
              and{' '}
              <LabelLink href={'http://example.com/'} target="_blank">
                Privacy Policy
              </LabelLink>
              .
            </Text>
          </Checkbox>
        </Label>
        <Button size="medium" onClick={onCreate} disabled={true}>
          Create a Membership
        </Button>
      </ModalFooter>
    </ScrolledModal>
  )
}
