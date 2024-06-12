import { difference } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { filterAccount, SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
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
import { Warning } from '@/common/components/Warning'
import { WithNullableValues } from '@/common/types/form'
import { definedValues } from '@/common/utils'
import { useYupValidationResolver } from '@/common/utils/validation'
import { AvatarInput } from '@/memberships/components/AvatarInput'
import { SelectValidatorAccounts, useSelectValidatorAccounts } from '@/memberships/components/SelectValidatorAccounts'
import { SocialMediaSelector } from '@/memberships/components/SocialMediaSelector/SocialMediaSelector'
import { useUploadAvatarAndSubmit } from '@/memberships/hooks/useUploadAvatarAndSubmit'
import { useGetMembersCountQuery } from '@/memberships/queries'

import { AvatarURISchema, ExternalResourcesSchema, HandleSchema } from '../../model/validation'
import { MemberWithDetails } from '../../types'

import { UpdateMemberForm } from './types'
import { changedOrNull, hasAnyEdits, hasAnyMetadateChanges, membershipExternalResourceToObject } from './utils'

type FormFields = Omit<UpdateMemberForm, 'validatorAccounts' | 'validatorAccountsToBeRemoved'> & {
  validatorAddresses: string[]
}
interface Props {
  onClose: () => void
  onSubmit: (params: WithNullableValues<UpdateMemberForm>, memberId: string, controllerAccount: string) => void
  member: MemberWithDetails
}

const UpdateMemberSchema = Yup.object().shape({
  avatarUri: AvatarURISchema.nullable(),
  handle: Yup.string().when('$isHandleChanged', (isHandleChanged: boolean, schema: AnySchema) => {
    return isHandleChanged ? HandleSchema : schema
  }),
  externalResources: ExternalResourcesSchema,
})

export const UpdateMembershipFormModal = ({ onClose, onSubmit, member }: Props) => {
  const { allAccounts } = useMyAccounts()

  const boundAccounts: Account[] = useMemo(
    () =>
      member.boundAccounts.map(
        (address) =>
          allAccounts.find((account) => account.address === address) ??
          accountOrNamed(allAccounts, address, 'Unsaved account')
      ),
    [allAccounts, member]
  )
  const selectValidatorAccounts = useSelectValidatorAccounts(boundAccounts)
  const {
    initialValidatorAccounts = [],
    state: { isValidator, accounts: accountsMap },
    isValidatorAccount,
  } = selectValidatorAccounts

  const updateMemberFormInitial = useMemo(
    () => ({
      id: member.id,
      name: member.name || '',
      handle: member.handle || '',
      about: member.about || '',
      avatarUri: process.env.REACT_APP_AVATAR_UPLOAD_URL ? '' : typeof member.avatar === 'string' ? member.avatar : '',
      rootAccount: member.rootAccount,
      controllerAccount: member.controllerAccount,
      externalResources: membershipExternalResourceToObject(member.externalResources) ?? {},
      isValidator: initialValidatorAccounts.length > 0,
      validatorAddresses: initialValidatorAccounts.map((account) => account.address),
    }),
    [member, initialValidatorAccounts]
  )

  const [handleMap, setHandleMap] = useState<string>(member.handle)
  const { data } = useGetMembersCountQuery({ variables: { where: { handle_eq: handleMap } } })
  const context = { size: data?.membershipsConnection.totalCount, isHandleChanged: handleMap !== member.handle }

  const { uploadAvatarAndSubmit, isUploading } = useUploadAvatarAndSubmit<FormFields>((fields) =>
    onSubmit(
      {
        ...changedOrNull(
          { ...fields, externalResources: { ...definedValues(fields.externalResources) } },
          updateMemberFormInitial
        ),
        validatorAccounts: isValidator
          ? difference(fields.validatorAddresses, updateMemberFormInitial.validatorAddresses)
          : [],
        validatorAccountsToBeRemoved: isValidator
          ? difference(updateMemberFormInitial.validatorAddresses, fields.validatorAddresses)
          : updateMemberFormInitial.validatorAddresses,
      },
      member.id,
      member.controllerAccount
    )
  )

  const form = useForm({
    resolver: useYupValidationResolver<UpdateMemberForm>(UpdateMemberSchema),
    context,
    mode: 'onChange',
  })

  useEffect(() => {
    form.reset({
      ...updateMemberFormInitial,
      rootAccount: accountOrNamed(allAccounts, member.rootAccount, 'Root Account'),
      controllerAccount: accountOrNamed(allAccounts, member.controllerAccount, 'Controller Account'),
    })
  }, [updateMemberFormInitial, member, allAccounts])

  const [controllerAccount, rootAccount, handle] = form.watch(['controllerAccount', 'rootAccount', 'handle'])

  useEffect(() => {
    form.trigger('handle')
  }, [JSON.stringify(context)])

  useEffect(() => {
    handle && setHandleMap(handle)
  }, [handle])

  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])

  const validatorAccounts = useMemo(() => Array.from(accountsMap.values()), [accountsMap])
  const formData = useMemo(
    () =>
      ({
        ...form.getValues(),
        isValidator,
        validatorAddresses: validatorAccounts.map(({ address }) => address),
      } as UpdateMemberForm),
    [form.getValues(), validatorAccounts]
  )

  const canUpdate =
    form.formState.isValid &&
    hasAnyEdits(formData, updateMemberFormInitial) &&
    (!isValidator || (validatorAccounts.length > 0 && validatorAccounts.every(isValidatorAccount)))

  const willBecomeUnverifiedValidator =
    updateMemberFormInitial.isValidator && hasAnyMetadateChanges(formData, updateMemberFormInitial)

  const submit = () => uploadAvatarAndSubmit(formData as FormFields)

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

            {willBecomeUnverifiedValidator && (
              <Warning
                content="The validator profile is currently verified and will become unverified If the membership is updated."
                icon="info"
                isClosable={false}
                isYellow
              />
            )}

            <SelectValidatorAccounts {...selectValidatorAccounts} />
          </FormProvider>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalTransactionFooter
        next={{
          disabled: !canUpdate || isUploading,
          label: isUploading ? <Loading text="Uploading avatar" /> : 'Save changes',
          onClick: submit,
        }}
      />
    </ScrolledModal>
  )
}
