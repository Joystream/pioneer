import { blake2AsHex } from '@polkadot/util-crypto'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { filterAccount, SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputText, InputTextarea } from '@/common/components/forms'
import {
  ModalFooter,
  ModalHeader,
  Row,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { WithNullableValues } from '@/common/types/form'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'

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
  const { api, connectionState } = useApi()
  const { allAccounts } = useMyAccounts()
  const [handleMap, setHandleMap] = useState<string>(member.handle)
  const handleHash = blake2AsHex(handleMap)

  const potentialMemberIdSize = useObservable(api?.query.members.memberIdByHandleHash.size(handleHash), [
    handleMap,
    connectionState,
  ])
  const context = { size: potentialMemberIdSize, isHandleChanged: handleMap !== member.handle }

  const form = useForm({
    resolver: useYupValidationResolver(UpdateMemberSchema),
    defaultValues: {
      id: member.id,
      name: member.name || '',
      handle: member.handle || '',
      about: '',
      avatarUri: typeof member.avatar === 'string' ? member.avatar : '',
      rootAccount: accountOrNamed(allAccounts, member.rootAccount, 'Root Account'),
      controllerAccount: accountOrNamed(allAccounts, member.controllerAccount, 'Controller Account'),
    },
    context,
    mode: 'onChange',
  })

  const [controllerAccount, rootAccount, handle] = form.watch(['controllerAccount', 'rootAccount', 'handle'])

  useEffect(() => {
    form.trigger('handle')
  }, [JSON.stringify(context)])

  useEffect(() => {
    setHandleMap(handle)
  }, [handle])

  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])

  const canUpdate = form.formState.isValid && hasAnyEdits(form.getValues(), member)

  const onCreate = () => {
    if (canUpdate) {
      onSubmit(changedOrNull<UpdateMemberForm>(form.getValues(), member))
    }
  }

  const hasError = enhancedHasError(form.formState.errors)
  const getErrorMessage = enhancedGetErrorMessage(form.formState.errors)
  return (
    <ScrolledModal modalSize="m" modalHeight="m" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Edit membership" />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <FormProvider {...form}>
            <Row>
              <TextMedium dark>Please fill in all the details below.</TextMedium>
            </Row>

            <Row>
              <InputComponent
                label="Root account"
                tooltipText="Root account is used to create membership and sign membership updates. All other transactions on the network are signed with controller account."
                required
                inputSize="l"
              >
                <SelectAccount filter={filterRoot} name="rootAccount" />
              </InputComponent>
            </Row>

            <Row>
              <InputComponent
                label="Controller account"
                tooltipText="Controller account is used to sign transactions."
                required
                inputSize="l"
              >
                <SelectAccount filter={filterController} name="controllerAccount" />
              </InputComponent>
            </Row>

            <Row>
              <InputComponent id="member-name" label="Member Name" required>
                <InputText id="member-name" placeholder="Type" name="name" />
              </InputComponent>
            </Row>

            <Row>
              <InputComponent
                id="member-handle"
                label="Membership handle"
                required
                validation={hasError('handle') ? 'invalid' : undefined}
                message={hasError('handle') ? getErrorMessage('handle') : 'Do not use same handles'}
              >
                <InputText id="member-handle" placeholder="Type" name="handle" />
              </InputComponent>
            </Row>

            <Row>
              <InputComponent id="member-about" label="About member" inputSize="l">
                <InputTextarea id="member-about" placeholder="Type" name="about" />
              </InputComponent>
            </Row>

            <Row>
              <InputComponent
                id="member-avatar"
                label="Member Avatar"
                required
                validation={hasError('avatarUri') ? 'invalid' : undefined}
                message={hasError('avatarUri') ? getErrorMessage('avatarUri') : 'Paste a URL of your avatar image.'}
                placeholder="Image URL"
              >
                <InputText id="member-avatar" name="avatarUri" />
              </InputComponent>
            </Row>
          </FormProvider>
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
