import { blake2AsHex } from '@polkadot/util-crypto'
import React, { useCallback, useEffect } from 'react'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { filterAccount, SelectAccount } from '../../../accounts/components/SelectAccount'
import { useMyAccounts } from '../../../accounts/hooks/useMyAccounts'
import { accountOrNamed } from '../../../accounts/model/accountOrNamed'
import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent, InputText, InputTextarea } from '../../../common/components/forms'
import { getErrorMessage, hasError } from '../../../common/components/forms/FieldError'
import {
  ModalFooter,
  ModalHeader,
  Row,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '../../../common/components/Modal'
import { TextMedium } from '../../../common/components/typography'
import { useApi } from '../../../common/hooks/useApi'
import { useForm } from '../../../common/hooks/useForm'
import { useObservable } from '../../../common/hooks/useObservable'
import { WithNullableValues } from '../../../common/types/form'
import { AvatarURISchema, HandleSchema } from '../../model/validation'
import { Member } from '../../types'

import { UpdateMemberForm } from './types'
import { changedOrNull, hasAnyEdits } from './utils'

interface Props {
  onClose: () => void
  onSubmit: (params: WithNullableValues<UpdateMemberForm>) => void
  member: Member
}

const UpdateMemberSchema = Yup.object().shape({
  avatarUri: AvatarURISchema.nullable(),
  handle: Yup.string().when('$isHandleChanged', (isHandleChanged: boolean, schema: AnySchema) => {
    return isHandleChanged ? HandleSchema : schema
  }),
})

export const UpdateMembershipFormModal = ({ onClose, onSubmit, member }: Props) => {
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()

  const initializer = {
    id: member.id,
    name: member.name || '',
    handle: member.handle || '',
    about: '',
    avatarUri: member.avatar || '',
    rootAccount: accountOrNamed(allAccounts, member.rootAccount, 'Root Account'),
    controllerAccount: accountOrNamed(allAccounts, member.controllerAccount, 'Controller Account'),
  }
  const { fields, changeField, validation } = useForm<UpdateMemberForm>(initializer, UpdateMemberSchema)
  const { isValid, errors, setContext } = validation
  const { handle, name, avatarUri, about, controllerAccount, rootAccount } = fields

  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])

  const handleHash = blake2AsHex(handle || '')
  const potentialMemberIdSize = useObservable(api.query.members.memberIdByHandleHash.size(handleHash), [handle])

  const canUpdate = isValid && hasAnyEdits(fields, member)

  useEffect(() => {
    setContext({ size: potentialMemberIdSize, isHandleChanged: fields.handle !== member.handle })
  }, [potentialMemberIdSize?.toString()])

  const onCreate = () => {
    if (canUpdate) {
      onSubmit(changedOrNull<UpdateMemberForm>(fields, member))
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
              tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
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
              tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
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
