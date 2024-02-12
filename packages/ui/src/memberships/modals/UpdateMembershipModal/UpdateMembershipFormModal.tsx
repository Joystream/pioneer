import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { filterAccount, SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { encodeAddress } from '@/accounts/model/encodeAddress'
import { Account } from '@/accounts/types'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputText, InputTextarea, Label, ToggleCheckbox } from '@/common/components/forms'
import { CrossIcon, PlusIcon } from '@/common/components/icons'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { Loading } from '@/common/components/Loading'
import {
  ModalHeader,
  ModalTransactionFooter,
  Row,
  RowInline,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '@/common/components/Modal'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'
import { WithNullableValues } from '@/common/types/form'
import { definedValues } from '@/common/utils'
import { useYupValidationResolver } from '@/common/utils/validation'
import { AvatarInput } from '@/memberships/components/AvatarInput'
import { SocialMediaSelector } from '@/memberships/components/SocialMediaSelector/SocialMediaSelector'
import { useUploadAvatarAndSubmit } from '@/memberships/hooks/useUploadAvatarAndSubmit'
import { useGetMembersCountQuery } from '@/memberships/queries'
import { useValidators } from '@/validators/hooks/useValidators'

import { AvatarURISchema, ExternalResourcesSchema, HandleSchema } from '../../model/validation'
import { MemberWithDetails } from '../../types'
import { InputNotificationIcon, SelectValidatorAccountWrapper } from '../BuyMembershipModal/BuyMembershipFormModal'

import { UpdateMemberForm } from './types'
import { changedOrNull, hasAnyEdits, hasAnyMetadateChanges, membershipExternalResourceToObject } from './utils'

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
  const validators = useValidators()
  const validatorAddresses = useMemo(
    () =>
      validators
        ?.flatMap(({ stashAccount: stash, controllerAccount: ctrl }) => (ctrl ? [stash, ctrl] : [stash]))
        .map(encodeAddress),
    [validators]
  )
  const initialValidatorAccounts = useMemo(
    () => member.boundAccounts.filter((address) => validatorAddresses?.includes(address)),
    [member.boundAccounts, validatorAddresses]
  )
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
      validatorAccounts: initialValidatorAccounts,
    }),
    [member, initialValidatorAccounts]
  )
  const isValidValidatorAccount = useCallback(
    (account: Account | undefined) => !account || validatorAddresses?.includes(account.address),
    [validatorAddresses]
  )

  const [handleMap, setHandleMap] = useState<string>(member.handle)
  const { data } = useGetMembersCountQuery({ variables: { where: { handle_eq: handleMap } } })
  const context = { size: data?.membershipsConnection.totalCount, isHandleChanged: handleMap !== member.handle }
  const { uploadAvatarAndSubmit, isUploading } = useUploadAvatarAndSubmit<UpdateMemberForm>((fields) =>
    onSubmit(
      {
        ...changedOrNull(
          { ...fields, externalResources: { ...definedValues(fields.externalResources) } },
          updateMemberFormInitial
        ),
        validatorAccounts: isValidator
          ? fields.validatorAccounts?.filter((address) => !initialValidatorAccounts.includes(address))
          : [],
        validatorAccountsToBeRemoved: isValidator
          ? initialValidatorAccounts.filter((address) => !fields.validatorAccounts?.includes(address))
          : initialValidatorAccounts,
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

  const [controllerAccount, rootAccount, handle, isValidator] = form.watch([
    'controllerAccount',
    'rootAccount',
    'handle',
    'isValidator',
  ])
  const [validatorAccounts, setValidatorAccounts] = useState<(Account | undefined)[]>([])
  useEffect(() => {
    setValidatorAccounts([
      ...initialValidatorAccounts.map((address) => accountOrNamed(allAccounts, address, 'Unsaved account')),
    ])
  }, [initialValidatorAccounts, allAccounts])

  useEffect(() => {
    form.trigger('handle')
  }, [JSON.stringify(context)])

  useEffect(() => {
    handle && setHandleMap(handle)
  }, [handle])

  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])

  const addValidatorAccount = (index: number, value: Account | undefined) => {
    setValidatorAccounts((accounts) => accounts.toSpliced(index, 1, value))
  }

  const removeValidatorAccount = (index: number) => {
    validatorAccounts && setValidatorAccounts((accounts) => accounts.toSpliced(index, 1))
  }

  const validatorAccountSelectorFilter = (index: number, account: Account) =>
    (!validatorAccounts ||
      ![...validatorAccounts.toSpliced(index, 1)].find(
        (accountOrUndefined) => accountOrUndefined?.address === account.address
      )) &&
    !!validatorAddresses?.includes(account.address)

  const formData = useMemo(
    () =>
      ({
        ...form.getValues(),
        validatorAccounts: (validatorAccounts.filter((account) => !!account) as Account[]).map(
          ({ address }) => address
        ),
      } as UpdateMemberForm),
    [form.getValues(), validatorAccounts]
  )

  const canUpdate =
    form.formState.isValid &&
    hasAnyEdits(formData, updateMemberFormInitial) &&
    (!isValidator ||
      (validatorAccounts?.filter((account) => !account || !isValidValidatorAccount(account)).length === 0 &&
        validatorAccounts?.filter((account) => !!account).length))

  const willBecomeUnverifiedValidator =
    updateMemberFormInitial.isValidator && hasAnyMetadateChanges(formData, updateMemberFormInitial)

  const submit = () => uploadAvatarAndSubmit(formData)

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

            <RowInline top={16}>
              <Label>I am a validator: </Label>
              <ToggleCheckbox trueLabel="Yes" falseLabel="No" name="isValidator" />
            </RowInline>

            {isValidator && (
              <>
                <SelectValidatorAccountWrapper className="validator-accounts">
                  <RowInline gap={4}>
                    <Label noMargin>Add validator controller account or validator stash account</Label>
                    <Tooltip tooltipText="This is the status which indicates the selected account is actually a validator account.">
                      <TooltipDefault />
                    </Tooltip>
                    <TextSmall dark>*</TextSmall>
                  </RowInline>
                  <TextMedium dark>
                    If your validator account is not in your signer wallet, paste the account address to the field
                    below:
                  </TextMedium>
                  {validatorAccounts?.map((account, index) => (
                    <Row>
                      <RowInline>
                        <InputComponent inputSize="l">
                          <SelectAccount
                            selected={account}
                            onChange={(account) => addValidatorAccount(index, account)}
                            filter={(account) => validatorAccountSelectorFilter(index, account)}
                          />
                        </InputComponent>
                        <ButtonGhost
                          square
                          size="large"
                          onClick={() => {
                            removeValidatorAccount(index)
                          }}
                          className="remove-button"
                        >
                          <CrossIcon />
                        </ButtonGhost>
                      </RowInline>
                      {!isValidValidatorAccount(account) && (
                        <RowInline gap={2}>
                          <TextSmall error>
                            <InputNotificationIcon>
                              <AlertSymbol />
                            </InputNotificationIcon>
                          </TextSmall>
                          <TextSmall error>
                            This account is neither a validator controller account nor a validator stash account.
                          </TextSmall>
                        </RowInline>
                      )}
                    </Row>
                  ))}
                  <RowInline justify="end">
                    <ButtonPrimary
                      size="small"
                      className="add-button"
                      onClick={() => addValidatorAccount(validatorAccounts.length, undefined)}
                    >
                      <PlusIcon /> Add Validator Account
                    </ButtonPrimary>
                  </RowInline>
                </SelectValidatorAccountWrapper>
              </>
            )}
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
