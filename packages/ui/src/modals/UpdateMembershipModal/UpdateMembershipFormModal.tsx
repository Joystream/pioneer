import { blake2AsHex } from '@polkadot/util-crypto'
import React, { useCallback, useEffect, useReducer } from 'react'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { Account, BaseMember } from '../../common/types'
import { filterAccount, SelectAccount } from '../../components/account/SelectAccount'
import { ButtonPrimary } from '../../components/buttons'
import { InputComponent, InputText, InputTextarea } from '../../components/forms'
import { getErrorMessage, hasError } from '../../components/forms/FieldError'
import {
  ModalFooter,
  ModalHeader,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '../../components/Modal'
import { TextMedium } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useFormValidation } from '../../hooks/useFormValidation'
import { useObservable } from '../../hooks/useObservable'
import { AvatarURISchema, HandleSchema } from '../../membership/data/validation'
import { Row } from '../common'
import { FormReducer, UpdateMemberForm, WithNullableValues } from './types'
import { changedOrNull, hasAnyEdits } from './utils'

interface Props {
  onClose: () => void
  onSubmit: (params: WithNullableValues<UpdateMemberForm>) => void
  member: BaseMember
}

const UpdateMemberSchema = Yup.object().shape({
  avatarUri: AvatarURISchema.nullable(),
  handle: Yup.string().when('$isHandleChanged', (isHandleChanged: boolean, schema: AnySchema) => {
    return isHandleChanged ? HandleSchema : schema
  }),
})

const updateReducer: FormReducer<UpdateMemberForm> = (state, action): UpdateMemberForm => {
  return { ...state, [action.type]: action.value }
}

export const UpdateMembershipFormModal = ({ onClose, onSubmit, member }: Props) => {
  const { api } = useApi()

  const [state, dispatch] = useReducer(updateReducer, {
    id: member.id,
    name: member.name || '',
    handle: member.handle || '',
    about: member.about || '',
    avatarUri: member.avatarUri || '',
    rootAccount: { address: member.rootAccount, name: '' },
    controllerAccount: { address: member.controllerAccount, name: '' },
  })
  const { handle, name, avatarUri, about, controllerAccount, rootAccount } = state
  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])

  const handleHash = blake2AsHex(handle || '')
  const potentialMemberIdSize = useObservable(api?.query.members.memberIdByHandleHash.size(handleHash), [handle])
  const { isValid, errors, validate } = useFormValidation<UpdateMemberForm>(UpdateMemberSchema)

  const canUpdate = isValid && hasAnyEdits(state, member)

  useEffect(() => {
    validate(state, { size: potentialMemberIdSize, isHandleChanged: state.handle !== member.handle })
  }, [state, potentialMemberIdSize])

  const changeField = (type: keyof UpdateMemberForm, value: string | Account) => {
    dispatch({ type, value })
  }

  const onCreate = () => {
    if (canUpdate) {
      onSubmit(changedOrNull<UpdateMemberForm>(state, member))
    }
  }

  return (
    <ScrolledModal modalSize="m" modalHeight="m" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Edit membership" />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <Row>
            <TextMedium dark>Please fill in all the details below.</TextMedium>
          </Row>

          <Row>
            <InputComponent
              label="Root account"
              helperText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
              required
              inputSize="l"
            >
              <SelectAccount
                filter={filterRoot}
                onChange={(account) => changeField('rootAccount', account)}
                selected={rootAccount}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent
              label="Controller account"
              helperText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
              required
              inputSize="l"
            >
              <SelectAccount
                filter={filterController}
                onChange={(account) => changeField('controllerAccount', account)}
                selected={controllerAccount}
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
        <ButtonPrimary size="medium" onClick={onCreate} disabled={!canUpdate}>
          Save changes
        </ButtonPrimary>
      </ModalFooter>
    </ScrolledModal>
  )
}
