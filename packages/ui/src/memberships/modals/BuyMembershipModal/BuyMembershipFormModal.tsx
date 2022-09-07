import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { TermsRoutes } from '@/app/constants/routes'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import {
  Checkbox,
  InlineToggleWrap,
  InputComponent,
  InputText,
  InputTextarea,
  Label,
  LabelLink,
  ToggleCheckbox,
} from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { Loading } from '@/common/components/Loading'
import {
  ModalFooter,
  ModalFooterGroup,
  ModalHeader,
  Row,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
  TransactionInfoContainer,
} from '@/common/components/Modal'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium } from '@/common/components/typography'
import { definedValues } from '@/common/utils'
import { useYupValidationResolver } from '@/common/utils/validation'
import { AvatarInput } from '@/memberships/components/AvatarInput'
import { SocialMediaSelector } from '@/memberships/components/SocialMediaSelector/SocialMediaSelector'
import { useUploadAvatarAndSubmit } from '@/memberships/hooks/useUploadAvatarAndSubmit'
import { useGetMembersCountQuery } from '@/memberships/queries'

import { SelectMember } from '../../components/SelectMember'
import {
  AccountSchema,
  AvatarURISchema,
  ExternalResourcesSchema,
  HandleSchema,
  ReferrerSchema,
} from '../../model/validation'
import { Member } from '../../types'

interface BuyMembershipFormModalProps {
  onClose: () => void
  onSubmit: (params: MemberFormFields) => void
  membershipPrice?: BalanceOf
}

interface BuyMembershipFormProps extends Omit<BuyMembershipFormModalProps, 'onClose'> {
  type: 'onBoarding' | 'general'
  membershipAccount?: string
  changeMembershipAccount?: () => void
}

const CreateMemberSchema = Yup.object().shape({
  rootAccount: AccountSchema.required('This field is required'),
  controllerAccount: AccountSchema.required('This field is required'),
  avatarUri: AvatarURISchema,
  name: Yup.string().required('This field is required'),
  handle: HandleSchema.required('This field is required').matches(
    /^[a-zA-Z0-9_.-]*$/,
    'Some of the characters are not allowed here '
  ),
  hasTerms: Yup.boolean().required().oneOf([true]),
  isReferred: Yup.boolean(),
  referrer: ReferrerSchema,
  externalResources: ExternalResourcesSchema,
})

export interface MemberFormFields {
  rootAccount?: Account
  controllerAccount?: Account
  name: string
  handle: string
  about: string
  avatarUri: File | string | null
  isReferred?: boolean
  referrer?: Member
  hasTerms?: boolean
  invitor?: Member
  externalResources: Record<string, string>
}

const formDefaultValues = {
  name: '',
  handle: '',
  about: '',
  avatarUri: null,
  isReferred: false,
  referrer: undefined,
  hasTerms: false,
  externalResources: {},
}

export interface InviteMembershipFormFields {
  to: Member
  from?: Member
  amount: number
}

export const BuyMembershipForm = ({
  onSubmit,
  membershipPrice,
  membershipAccount,
  changeMembershipAccount,
  type,
}: BuyMembershipFormProps) => {
  const { allAccounts } = useMyAccounts()
  const [formHandleMap, setFormHandleMap] = useState('')
  const { data } = useGetMembersCountQuery({ variables: { where: { handle_eq: formHandleMap } } })
  const { isUploading, uploadAvatarAndSubmit } = useUploadAvatarAndSubmit(onSubmit)
  const form = useForm<MemberFormFields>({
    resolver: useYupValidationResolver(CreateMemberSchema),
    context: { size: data?.membershipsConnection.totalCount },
    mode: 'onChange',
    defaultValues: {
      ...formDefaultValues,
      rootAccount: membershipAccount ? accountOrNamed(allAccounts, membershipAccount, 'Account') : undefined,
      controllerAccount: membershipAccount ? accountOrNamed(allAccounts, membershipAccount, 'Account') : undefined,
    },
  })

  const [handle, isReferred, referrer] = form.watch(['handle', 'isReferred', 'referrer'])

  useEffect(() => {
    if (handle) {
      setFormHandleMap(handle)
    }
  }, [handle])

  useEffect(() => {
    if (formHandleMap && (data?.membershipsConnection.totalCount || form.formState.errors.handle)) {
      form.trigger('handle')
    }
  }, [data?.membershipsConnection.totalCount])

  return (
    <>
      <ScrolledModalBody>
        <FormProvider {...form}>
          <ScrolledModalContainer>
            {type === 'general' && (
              <Row>
                <InlineToggleWrap>
                  <Label>I was referred by a member: </Label>
                  <ToggleCheckbox trueLabel="Yes" falseLabel="No" name="isReferred" />
                </InlineToggleWrap>
                {isReferred && (
                  <InputComponent required inputSize="l">
                    <SelectMember
                      onChange={(member) => form.setValue('referrer', member, { shouldValidate: true })}
                      disabled={!isReferred}
                      selected={referrer}
                    />
                  </InputComponent>
                )}
              </Row>
            )}
            <Row>
              <TextMedium dark>Please fill in all the details below.</TextMedium>
            </Row>
            {type === 'general' && (
              <>
                <Row>
                  <InputComponent
                    label="Root account"
                    required
                    inputSize="l"
                    tooltipText="Something about root accounts"
                  >
                    <SelectAccount name="rootAccount" />
                  </InputComponent>
                </Row>
                <Row>
                  <InputComponent
                    label="Controller account"
                    required
                    inputSize="l"
                    tooltipText="Something about controller account"
                  >
                    <SelectAccount name="controllerAccount" />
                  </InputComponent>
                </Row>
              </>
            )}
            <Row>
              <InputComponent id="member-name" label="Member Name" required name="name">
                <InputText id="member-name" placeholder="Type" name="name" />
              </InputComponent>
            </Row>
            <Row>
              <InputComponent id="membership-handle" label="Membership handle" required name="handle">
                <InputText id="membership-handle" placeholder="Type" name="handle" />
              </InputComponent>
            </Row>
            <Row>
              <InputComponent id="member-about" label="About member" inputSize="l">
                <InputTextarea id="member-about" placeholder="Type" name="about" />
              </InputComponent>
            </Row>

            <AvatarInput />

            <SocialMediaSelector />
          </ScrolledModalContainer>
        </FormProvider>
      </ScrolledModalBody>
      <ModalFooter twoColumns>
        <ModalFooterGroup left>
          {type === 'onBoarding' && (
            <ButtonGhost onClick={changeMembershipAccount} size="medium">
              <Arrow direction="left" />
              Change account
            </ButtonGhost>
          )}
          <Checkbox
            id="privacy-policy-agreement"
            onChange={(hasTerms) => form.setValue('hasTerms', hasTerms, { shouldValidate: true })}
          >
            <TextMedium colorInherit>
              I agree to the{' '}
              <LabelLink to={TermsRoutes.termsOfService} target="_blank">
                Terms of Service
              </LabelLink>{' '}
              and{' '}
              <LabelLink to={TermsRoutes.privacyPolicy} target="_blank">
                Privacy Policy
              </LabelLink>
              .
            </TextMedium>
          </Checkbox>
        </ModalFooterGroup>
        <ModalFooterGroup>
          {type === 'general' && (
            <TransactionInfoContainer>
              <TransactionInfo
                title="Creation fee:"
                value={membershipPrice?.toBn()}
                tooltipText={
                  <>
                    Creation fee is the price of membership, it is managed by council through the proposal system. It is
                    inclusive of transaction fee.
                    <TooltipExternalLink
                      href="https://joystream.gitbook.io/joystream-handbook/governance/proposals"
                      target="_blank"
                    >
                      <TextMedium>Link</TextMedium> <LinkSymbol />
                    </TooltipExternalLink>
                  </>
                }
              />
            </TransactionInfoContainer>
          )}
          <ButtonPrimary
            size="medium"
            onClick={() => {
              const values = form.getValues()
              uploadAvatarAndSubmit({ ...values, externalResources: { ...definedValues(values.externalResources) } })
            }}
            disabled={!form.formState.isValid || isUploading}
          >
            {isUploading ? <Loading text="Uploading avatar" /> : 'Create a Membership'}
          </ButtonPrimary>
        </ModalFooterGroup>
      </ModalFooter>
    </>
  )
}

export const BuyMembershipFormModal = ({ onClose, onSubmit, membershipPrice }: BuyMembershipFormModalProps) => {
  return (
    <ScrolledModal modalSize="m" modalHeight="m" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Add membership" />
      <BuyMembershipForm type="general" membershipPrice={membershipPrice} onSubmit={onSubmit} />
    </ScrolledModal>
  )
}
