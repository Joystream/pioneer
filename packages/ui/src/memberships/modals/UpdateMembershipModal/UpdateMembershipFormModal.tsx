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
import { WithNullableValues } from '@/common/types/form'
import { definedValues } from '@/common/utils'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { SocialMediaSelector } from '@/memberships/components/SocialMediaSelector'
import { useGetMembersCountQuery } from '@/memberships/queries'

import { AvatarURISchema, HandleSchema } from '../../model/validation'
import { MemberWithDetails } from '../../types'

import { UpdateMemberForm } from './types'
import { changedOrNull, hasAnyEdits, membershipExternalResourceToObject } from './utils'

interface Props {
  onClose: () => void
  onSubmit: (params: WithNullableValues<UpdateMemberForm>) => void
  member: MemberWithDetails
}

const UpdateMemberSchema = Yup.object().shape({
  avatarUri: AvatarURISchema.nullable(),
  handle: Yup.string().when('$isHandleChanged', (isHandleChanged: boolean, schema: AnySchema) => {
    return isHandleChanged ? HandleSchema : schema
  }),
  externalResources: Yup.object().shape({
    EMAIL: Yup.string().email('Field has to be a valid email address'),
    HYPERLINK: Yup.string().url('Invalid hyperlink format'),
  }),
})

export const UpdateMembershipFormModal = ({ onClose, onSubmit, member }: Props) => {
  const { allAccounts } = useMyAccounts()
  const [handleMap, setHandleMap] = useState<string>(member.handle)
  const { data } = useGetMembersCountQuery({ variables: { where: { handle_eq: handleMap } } })
  const context = { size: data?.membershipsConnection.totalCount, isHandleChanged: handleMap !== member.handle }

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
      externalResources: membershipExternalResourceToObject(member.externalResources) ?? {},
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
      const values = form.getValues()
      onSubmit(
        changedOrNull<UpdateMemberForm>(
          { ...values, externalResources: { ...definedValues(values.externalResources) } },
          member
        )
      )
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
            <SocialMediaSelector
              initialSocials={
                member.externalResources ? member.externalResources.map((resource) => resource.source) : []
              }
            />
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
