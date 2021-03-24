import React, { useEffect, useReducer } from 'react'
import { Button } from '../../components/buttons'
import { InputComponent, Label, TextArea, TextInput } from '../../components/forms'
import { Help } from '../../components/Help'
import { SelectMember } from '../../components/membership/SelectMember'
import {
  ModalFooter,
  ModalHeader,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '../../components/Modal'
import { Text } from '../../components/typography'
import { useFormValidation } from '../../hooks/useFormValidation'
import { FormFields, formReducer } from '../AddMembershipModal/formReducer'
import { Row } from '../common'
import * as Yup from 'yup'
import { AvatarURISchema, HandleSchema, MemberSchema, NewAddressSchema } from '../../membership/data/validation'
import { blake2AsHex } from '@polkadot/util-crypto'
import { useObservable } from '../../hooks/useObservable'
import { useApi } from '../../hooks/useApi'
import { Account, BaseMember, Member } from '../../common/types'
import { FieldError, hasError } from '../../components/forms/FieldError'
import { useKeyring } from '../../hooks/useKeyring'

interface InviteProps {
  onClose: () => void
  onSubmit: (params: Member) => void
}

const InviteMemberSchema = Yup.object().shape({
  invitor: MemberSchema.required(),
  rootAccount: NewAddressSchema('rootAccount'),
  controllerAccount: NewAddressSchema('controllerAccount'),
  avatarURI: AvatarURISchema,
  name: Yup.string().required(),
  handle: HandleSchema.required(),
})

export const InviteFormModal = ({ onClose, onSubmit }: InviteProps) => {
  const { api } = useApi()
  const keyring = useKeyring()
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    rootAccount: undefined,
    controllerAccount: undefined,
    handle: '',
    about: '',
    avatarURI: '',
    hasTerms: false,
    invitor: undefined,
  })
  const { rootAccount, controllerAccount, handle, name, avatarURI, about } = state
  const onCreate = () => onSubmit(state as Member)
  const handleHash = blake2AsHex(handle)
  const potentialMemberIdSize = useObservable(api?.query.members.memberIdByHandleHash.size(handleHash), [handle])
  const { isValid, errors, validate } = useFormValidation<FormFields>(InviteMemberSchema)
  useEffect(() => {
    validate(state, { size: potentialMemberIdSize, keyring })
  }, [state, potentialMemberIdSize])
  const changeField = (type: keyof FormFields, value: string | Account | BaseMember | boolean) => {
    dispatch({ type, value })
  }

  return (
    <ScrolledModal modalSize="m" modalHeight="m" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Invite a member" />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <InputComponent label="Inviting member" inputSize="l">
            <SelectMember onChange={(member) => changeField('invitor', member)} />
          </InputComponent>

          <Row>
            <Text size={2} dark>
              To invite a member please fill in all the details below.
            </Text>
          </Row>

          <Row>
            <Label isRequired htmlFor="root-account">
              Root account <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
            </Label>
            <TextInput
              id="root-account"
              type="text"
              placeholder="Type"
              value={rootAccount?.address ?? ''}
              onChange={(event) => changeField('rootAccount', { name: undefined, address: event.target.value })}
              invalid={hasError('rootAccount', errors)}
            />
            <FieldError name="rootAccount" errors={errors} />
          </Row>

          <Row>
            <Label isRequired htmlFor="controller-account">
              Controller account <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
            </Label>
            <TextInput
              id="controller-account"
              type="text"
              placeholder="Type"
              value={controllerAccount?.address ?? ''}
              onChange={(event) => changeField('controllerAccount', { name: undefined, address: event.target.value })}
              invalid={hasError('controllerAccount', errors)}
            />
            <FieldError name="controllerAccount" errors={errors} />
          </Row>

          <Row>
            <Label htmlFor="member-name" isRequired>
              Member Name
            </Label>
            <TextInput
              id="member-name"
              type="text"
              placeholder="Type"
              value={name}
              onChange={(event) => changeField('name', event.target.value)}
            />
          </Row>

          <Row>
            <Label htmlFor="member-handle" isRequired>
              Membership handle
            </Label>
            <TextInput
              id="member-handle"
              type="text"
              placeholder="Type"
              value={handle}
              onChange={(event) => changeField('handle', event.target.value)}
              invalid={hasError('handle', errors)}
            />
            <FieldError name="handle" errors={errors} />
          </Row>

          <Row>
            <Label htmlFor="member-about">About Member</Label>
            <TextArea
              id="member-about"
              value={about}
              placeholder="Type"
              rows={4}
              onChange={(event) => changeField('about', event.target.value)}
            />
          </Row>

          <Row>
            <Label htmlFor="member-avatar">Member Avatar</Label>
            <TextInput
              id="member-avatar"
              type="text"
              placeholder="Image URL"
              value={avatarURI}
              onChange={(event) => changeField('avatarURI', event.target.value)}
              invalid={hasError('avatarURI', errors)}
            />
            <Text size={3} italic={true}>
              Paste an URL of your avatar image. Text lorem ipsum.
            </Text>
            <FieldError name="avatarURI" errors={errors} />
          </Row>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <Button size="medium" onClick={onCreate} disabled={!isValid}>
          Invite a Member
        </Button>
      </ModalFooter>
    </ScrolledModal>
  )
}
