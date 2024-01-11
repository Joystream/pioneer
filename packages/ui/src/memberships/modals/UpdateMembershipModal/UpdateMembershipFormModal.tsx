import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { filterAccount, SelectAccount, SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputText, InputTextarea, Label, ToggleCheckbox } from '@/common/components/forms'
import { CrossIcon, PlusIcon } from '@/common/components/icons'
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
import { Address } from '@/common/types'
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
import { SelectValidatorAccountWrapper } from '../BuyMembershipModal/BuyMembershipFormModal'

import { UpdateMemberForm } from './types'
import { changedOrNull, hasAnyEdits, hasAnyMetadateChanges, membershipExternalResourceToObject } from './utils'

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

export const UpdateMembershipFormModal = ({ onClose, onSubmit, member }: Props) => {
  const { allAccounts } = useMyAccounts()
  const { allValidators, allValidatorsWithCtrlAcc } = useValidators()
  const isValidatorAccount = useCallback(
    (address: Address): boolean | undefined =>
      allValidators?.map(({ address }) => address).includes(address) || allValidatorsWithCtrlAcc?.includes(address),
    [allValidators, allValidatorsWithCtrlAcc]
  )
  const initialValidatorAccounts = useMemo(
    () => member.boundAccounts.filter((address) => isValidatorAccount(address)),
    [member.boundAccounts, isValidatorAccount]
  )
  const [handleMap, setHandleMap] = useState<string>(member.handle)
  const { data } = useGetMembersCountQuery({ variables: { where: { handle_eq: handleMap } } })
  const context = { size: data?.membershipsConnection.totalCount, isHandleChanged: handleMap !== member.handle }
  const { uploadAvatarAndSubmit, isUploading } = useUploadAvatarAndSubmit<UpdateMemberForm>((fields) =>
    onSubmit({
      ...changedOrNull(
        { ...fields, externalResources: { ...definedValues(fields.externalResources) } },
        updateMemberFormInitial
      ),
      id: fields.id,
      validatorAccounts: isValidator
        ? fields.validatorAccounts?.filter((address) => !initialValidatorAccounts.includes(address))
        : [],
      validatorAccountsToBeRemoved: isValidator
        ? initialValidatorAccounts.filter((address) => !fields.validatorAccounts?.includes(address))
        : initialValidatorAccounts,
    })
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
      validatorAccounts: initialValidatorAccounts.length ? [...initialValidatorAccounts] : undefined,
    }),
    [member, initialValidatorAccounts]
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

  const [controllerAccount, rootAccount, handle, isValidator, validatorAccountCandidate, validatorAccounts] =
    form.watch([
      'controllerAccount',
      'rootAccount',
      'handle',
      'isValidator',
      'validatorAccountCandidate',
      'validatorAccounts',
    ])

  useEffect(() => {
    form.trigger('handle')
  }, [JSON.stringify(context)])

  useEffect(() => {
    handle && setHandleMap(handle)
  }, [handle])

  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])

  const canUpdate =
    form.formState.isValid &&
    hasAnyEdits(form.getValues(), updateMemberFormInitial) &&
    (!isValidator || validatorAccounts?.length)

  const willBecomeUnverifiedValidator =
    updateMemberFormInitial.isValidator && hasAnyMetadateChanges(form.getValues(), updateMemberFormInitial)

  const addValidatorAccount = () => {
    if (validatorAccountCandidate) {
      setValidatorAccounts([...new Set([...(validatorAccounts ?? []), validatorAccountCandidate.address])])
      form?.setValue('validatorAccountCandidate' as keyof UpdateMemberForm, undefined)
    }
  }

  const removeValidatorAccount = (index: number) => {
    validatorAccounts &&
      setValidatorAccounts([...validatorAccounts.slice(0, index), ...validatorAccounts.slice(index + 1)])
  }

  const setValidatorAccounts = (accounts: Address[]) => {
    form?.setValue('validatorAccounts' as keyof UpdateMemberForm, [])
    accounts.map((account, index) => {
      form?.register(('validatorAccounts[' + index + ']') as keyof UpdateMemberForm)
      form?.setValue(('validatorAccounts[' + index + ']') as keyof UpdateMemberForm, account)
    })
  }

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
                <SelectValidatorAccountWrapper>
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
                  <RowInline>
                    <InputComponent id="select-validatorAccount" inputSize="l">
                      <SelectAccount id="select-validatorAccount" name="validatorAccountCandidate" />
                    </InputComponent>
                    <ButtonPrimary
                      square
                      size="large"
                      onClick={addValidatorAccount}
                      disabled={!validatorAccountCandidate}
                      className="add-button"
                    >
                      <PlusIcon />
                    </ButtonPrimary>
                  </RowInline>
                </SelectValidatorAccountWrapper>

                {validatorAccounts?.map((address, index) => (
                  <Row>
                    <RowInline>
                      <SelectedAccount
                        account={accountOrNamed(allAccounts, address, 'Unsaved account')}
                        key={'selected' + index}
                      />
                      <ButtonGhost
                        square
                        size="large"
                        onClick={() => {
                          removeValidatorAccount(index)
                        }}
                      >
                        <CrossIcon />
                      </ButtonGhost>
                    </RowInline>
                  </Row>
                ))}
              </>
            )}
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
