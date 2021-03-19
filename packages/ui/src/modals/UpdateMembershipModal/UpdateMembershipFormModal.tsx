import { blake2AsHex } from '@polkadot/util-crypto'
import React, { useEffect, useReducer } from 'react'
import * as Yup from 'yup'
import { AnySchema } from 'yup'
import { BaseMember } from '../../common/types'
import { Button } from '../../components/buttons'
import { Label, TextArea, TextInput } from '../../components/forms'
import { FieldError, hasError } from '../../components/forms/FieldError'
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
import { useObservable } from '../../hooks/useObservable'
import { AvatarURISchema, HandleSchema } from '../../membership/data/validation'
import { Row } from '../common'

interface Props {
  onClose: () => void
  onSubmit: (params: UpdateMemberForm) => void
  member: BaseMember
}

export interface UpdateMemberForm {
  id: string
  name?: string
  handle?: string
  avatarURI?: string
  about?: string
}

export type Action = {
  type: keyof UpdateMemberForm
  value: string | undefined
}

const UpdateMemberSchema = Yup.object().shape({
  avatarURI: AvatarURISchema.nullable(),
  handle: Yup.string().when('$isHandleChanged', (isHandleChanged: boolean, schema: AnySchema) =>
    isHandleChanged ? HandleSchema : schema
  ),
})

const updateReducer = (state: UpdateMemberForm, action: Action): UpdateMemberForm => {
  return {
    ...state,
    [action.type]: action.value as string,
  }
}

const checkEdits = (formData: any, member: any) => {
  for (const key of Object.keys(formData)) {
    if (member[key] !== formData[key]) {
      return true
    }
  }

  return false
}

export const UpdateMembershipFormModal = ({ onClose, onSubmit, member }: Props) => {
  const { api } = useApi()

  const [state, dispatch] = useReducer(updateReducer, {
    id: member.id,
    name: member.name || '',
    handle: member.handle || '',
    about: member.about || '',
    avatarURI: member.avatarURI || '',
  })
  const { handle, name, avatarURI, about } = state

  const handleHash = blake2AsHex(handle || '')
  const potentialMemberIdSize = useObservable(api?.query.members.memberIdByHandleHash.size(handleHash), [handle])
  const { isValid, errors, validate } = useFormValidation<UpdateMemberForm>(UpdateMemberSchema)

  const canUpdate = isValid && checkEdits(state, member)

  useEffect(() => {
    validate(state, { size: potentialMemberIdSize })
  }, [state, potentialMemberIdSize])

  const changeField = (type: keyof UpdateMemberForm, value: string) => {
    dispatch({ type, value })
  }

  const onCreate = () => {
    if (canUpdate) {
      onSubmit(state)
    }
  }

  return (
    <ScrolledModal modalSize="m" modalHeight="m" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Edit membership" />
      <ScrolledModalBody>
        <ScrolledModalContainer>
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
        <Button size="medium" onClick={onCreate} disabled={!canUpdate}>
          Save changes
        </Button>
      </ModalFooter>
    </ScrolledModal>
  )
}
