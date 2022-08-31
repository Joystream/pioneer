import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { filterAccount, SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { InputComponent, InputText, InputTextarea } from '@/common/components/forms'
import {
  ModalHeader,
  ModalTransactionFooter,
  Row,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SmallFileUpload } from '@/common/components/SmallFileUpload'
import { TextMedium } from '@/common/components/typography'
import { uploadAvatarImage } from '@/common/modals/OnBoardingModal'
import { WithNullableValues } from '@/common/types/form'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { useGetMembersCountQuery } from '@/memberships/queries'

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

const getUpdateMemberFormInitial = (member: Member) => ({
  id: member.id,
  name: member.name || '',
  handle: member.handle || '',
  about: '',
  avatarUri: process.env.REACT_APP_AVATAR_UPLOAD_URL ? '' : typeof member.avatar === 'string' ? member.avatar : '',
  rootAccount: member.rootAccount,
  controllerAccount: member.controllerAccount,
})

export const UpdateMembershipFormModal = ({ onClose, onSubmit, member }: Props) => {
  const { allAccounts } = useMyAccounts()
  const [handleMap, setHandleMap] = useState<string>(member.handle)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState<boolean>(false)
  const { data } = useGetMembersCountQuery({ variables: { where: { handle_eq: handleMap } } })
  const context = { size: data?.membershipsConnection.totalCount, isHandleChanged: handleMap !== member.handle }

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

  const onCreate = async () => {
    if (canUpdate) {
      const fields = form.getValues()
      try {
        if (fields.avatarUri && fields.avatarUri instanceof File) {
          setIsUploadingAvatar(true)
          const data = await uploadAvatarImage(fields.avatarUri).then((res) => res.json())
          setIsUploadingAvatar(false)
          onSubmit(
            changedOrNull<UpdateMemberForm>(
              { ...fields, avatarUri: `${process.env.REACT_APP_AVATAR_UPLOAD_URL}/${data.fileName}` },
              getUpdateMemberFormInitial(member)
            )
          )
        } else {
          onSubmit(changedOrNull<UpdateMemberForm>(fields, getUpdateMemberFormInitial(member)))
        }
      } catch (e) {
        onSubmit(changedOrNull<UpdateMemberForm>(fields, getUpdateMemberFormInitial(member)))
      }
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
              {process.env.REACT_APP_AVATAR_UPLOAD_URL ? (
                <RowGapBlock gap={10}>
                  <TextMedium bold value>
                    Member avatar
                  </TextMedium>
                  <SmallFileUpload
                    initialPreview={member.avatar}
                    name="avatarUri"
                    onUpload={(event) =>
                      form.setValue('avatarUri', event.target.files?.item(0) ?? null, { shouldValidate: true })
                    }
                  />
                </RowGapBlock>
              ) : (
                <InputComponent
                  id="member-avatar"
                  required
                  label="Member Avatar"
                  validation={hasError('avatarUri') ? 'invalid' : undefined}
                  message={
                    hasError('avatarUri')
                      ? getErrorMessage('avatarUri')
                      : 'Paste an URL of your avatar image. Text lorem ipsum.'
                  }
                  placeholder="Image URL"
                >
                  <InputText id="member-avatar" name="avatarUri" />
                </InputComponent>
              )}
            </Row>
          </FormProvider>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalTransactionFooter
        next={{
          disabled: !canUpdate,
          label: isUploadingAvatar ? 'Uploading avatar...' : 'Save changes',
          onClick: onCreate,
        }}
      />
    </ScrolledModal>
  )
}
