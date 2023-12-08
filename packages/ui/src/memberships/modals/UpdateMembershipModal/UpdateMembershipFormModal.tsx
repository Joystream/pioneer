import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { filterAccount, SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { InputComponent, InputText, InputTextarea } from '@/common/components/forms'
import { Loading } from '@/common/components/Loading'
import {
  ModalHeader,
  ModalTransactionFooter,
  Row,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { WithNullableValues } from '@/common/types/form'
import { definedValues } from '@/common/utils'
import { useYupValidationResolver } from '@/common/utils/validation'
import { AvatarInput } from '@/memberships/components/AvatarInput'
import { SocialMediaSelector } from '@/memberships/components/SocialMediaSelector/SocialMediaSelector'
import { useUploadAvatarAndSubmit } from '@/memberships/hooks/useUploadAvatarAndSubmit'
import { useGetMembersCountQuery } from '@/memberships/queries'

import { AvatarURISchema, ExternalResourcesSchema, HandleSchema } from '../../model/validation'
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
  externalResources: ExternalResourcesSchema,
})

const getUpdateMemberFormInitial = (member: MemberWithDetails) => ({
  id: member.id,
  name: member.name || '',
  handle: member.handle || '',
  about: member.about || '',
  avatarUri: process.env.REACT_APP_AVATAR_UPLOAD_URL ? '' : typeof member.avatar === 'string' ? member.avatar : '',
  rootAccount: member.rootAccount,
  controllerAccount: member.controllerAccount,
  externalResources: membershipExternalResourceToObject(member.externalResources) ?? {},
})

export const UpdateMembershipFormModal = ({ onClose, onSubmit, member }: Props) => {
  const { allAccounts } = useMyAccounts()
  const [handleMap, setHandleMap] = useState<string>(member.handle)
  const { data } = useGetMembersCountQuery({ variables: { where: { handle_eq: handleMap } } })
  const context = { size: data?.membershipsConnection.totalCount, isHandleChanged: handleMap !== member.handle }
  const { uploadAvatarAndSubmit, isUploading } = useUploadAvatarAndSubmit<UpdateMemberForm>((fields) =>
    onSubmit(
      changedOrNull(
        { ...fields, externalResources: { ...definedValues(fields.externalResources) } },
        getUpdateMemberFormInitial(member)
      )
    )
  )

  const form = useForm({
    resolver: useYupValidationResolver<UpdateMemberForm>(UpdateMemberSchema),
    defaultValues: {
      ...getUpdateMemberFormInitial(member),
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
    handle && setHandleMap(handle)
  }, [handle])

  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])

  const canUpdate = form.formState.isValid && hasAnyEdits(form.getValues(), getUpdateMemberFormInitial(member))

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
              <InputComponent id="member-handle" label="Membership handle" name="handle" required>
                <InputText id="member-handle" placeholder="Type" name="handle" />
              </InputComponent>
            </Row>

            <Row>
              <InputComponent id="member-about" label="About member" inputSize="l">
                <InputTextarea id="member-about" placeholder="Type" name="about" />
              </InputComponent>
            </Row>

            <AvatarInput initialPreview={member.avatar} />

            <SocialMediaSelector
              initialSocials={
                member.externalResources ? member.externalResources.map((resource) => resource.source) : []
              }
            />
          </FormProvider>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalTransactionFooter
        next={{
          disabled: !canUpdate || isUploading,
          label: isUploading ? <Loading text="Uploading avatar" /> : 'Save changes',
          onClick: () => uploadAvatarAndSubmit(form.getValues()),
        }}
      />
    </ScrolledModal>
  )
}
