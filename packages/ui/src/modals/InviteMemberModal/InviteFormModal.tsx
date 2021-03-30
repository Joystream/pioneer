import { blake2AsHex } from '@polkadot/util-crypto'
import React, { useEffect, useReducer } from 'react'
import * as Yup from 'yup'
import { Account, BaseMember, Member } from '../../common/types'
import { Button } from '../../components/buttons'
import { InputComponent, InputText, InputTextarea } from '../../components/forms'
import { getErrorMessage, hasError } from '../../components/forms/FieldError'
import { SelectMember } from '../../components/membership/SelectMember'
import {
  ModalFooter,
  ModalHeader,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '../../components/Modal'
import { Text } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useFormValidation } from '../../hooks/useFormValidation'
import { useKeyring } from '../../hooks/useKeyring'
import { useObservable } from '../../hooks/useObservable'
import { AvatarURISchema, HandleSchema, MemberSchema, NewAddressSchema } from '../../membership/data/validation'
import { FormFields, formReducer } from '../AddMembershipModal/formReducer'
import { Row } from '../common'

interface InviteProps {
  onClose: () => void
  onSubmit: (params: Member) => void
}

const InviteMemberSchema = Yup.object().shape({
  invitor: MemberSchema.required(),
  rootAccount: NewAddressSchema('rootAccount'),
  controllerAccount: NewAddressSchema('controllerAccount'),
  avatarUri: AvatarURISchema,
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
    avatarUri: '',
    hasTerms: false,
    invitor: undefined,
  })
  const { rootAccount, controllerAccount, handle, name, avatarUri, about } = state
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
            <InputComponent
              label="Root account"
              id="root-account"
              required
              helperText="Something about root accounts"
              validation={hasError('rootAccount', errors) ? 'invalid' : undefined}
              message={hasError('rootAccount', errors) ? getErrorMessage('rootAccount', errors) : ''}
            >
              <InputText
                id="root-account"
                placeholder="Type"
                value={rootAccount?.address ?? ''}
                onChange={(event) => changeField('rootAccount', { name: undefined, address: event.target.value })}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent
              label="Controller account"
              id="controller-account"
              required
              helperText="Something about controller accounts"
              validation={hasError('controllerAccount', errors) ? 'invalid' : undefined}
              message={hasError('controllerAccount', errors) ? getErrorMessage('controllerAccount', errors) : ''}
            >
              <InputText
                id="controller-account"
                placeholder="Type"
                value={controllerAccount?.address ?? ''}
                onChange={(event) => changeField('controllerAccount', { name: undefined, address: event.target.value })}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent id="member-name" label="Member Name" required>
              <InputText
                id="member-name"
                placeholder="Type"
                value={name}
                onChange={(event) => changeField('name', event.target.value)}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent
              id="member-handle"
              label="Membership handle"
              required
              validation={hasError('handle', errors) ? 'invalid' : undefined}
              message={hasError('handle', errors) ? getErrorMessage('handle', errors) : 'Do not use same handles'}
            >
              <InputText
                id="member-handle"
                placeholder="Type"
                value={handle}
                onChange={(event) => changeField('handle', event.target.value)}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent id="member-about" label="About member" inputSize="l">
              <InputTextarea
                id="member-about"
                value={about}
                placeholder="Type"
                onChange={(event) => changeField('about', event.target.value)}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent
              id="member-avatar"
              label="Member Avatar"
              required
              value={avatarUri}
              validation={hasError('avatarUri', errors) ? 'invalid' : undefined}
              message={
                hasError('avatarUri', errors)
                  ? getErrorMessage('avatarUri', errors)
                  : 'Paste an URL of your avatar image. Text lorem ipsum.'
              }
              placeholder="Image URL"
            >
              <InputText
                id="member-avatar"
                value={avatarUri}
                onChange={(event) => changeField('avatarUri', event.target.value)}
              />
            </InputComponent>
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
