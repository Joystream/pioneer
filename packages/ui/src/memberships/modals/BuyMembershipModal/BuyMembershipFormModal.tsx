import HCaptcha from '@hcaptcha/react-hcaptcha'
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
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
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

const isRequired = 'This field is required.'
const CreateMemberSchema = Yup.object().shape({
  rootAccount: AccountSchema.required(isRequired),
  controllerAccount: AccountSchema.required(isRequired),
  avatarUri: AvatarURISchema,
  name: Yup.string().required(isRequired),
  handle: HandleSchema.required(isRequired).matches(
    /^[a-zA-Z0-9_.-]*$/,
    'Spaces and special characters are not supported.'
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
  captchaToken?: string
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
  const { isUploading, uploadAvatarAndSubmit } = useUploadAvatarAndSubmit(onSubmit)
  const { data } = useGetMembersCountQuery({ variables: { where: { handle_eq: formHandleMap } } })

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

  const [handle, isReferred, referrer, captchaToken] = form.watch(['handle', 'isReferred', 'referrer', 'captchaToken'])

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

  const isFormValid = !isUploading && form.formState.isValid
  const isDisabled =
    type === 'onBoarding' && process.env.REACT_APP_CAPTCHA_SITE_KEY ? !captchaToken || !isFormValid : !isFormValid

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
                    tooltipText="Root account is the primary account associated with the membership. It cannot be changed. Root account is used to sign transactions of associating a controller account with the membership. While it is possible to use the same account as Root and Controller, it is not advisable to do so and for security purposes. Best practice is to keep it offline all the time unless your controller is compromise and you need to replace it."
                  >
                    <SelectAccount name="rootAccount" />
                  </InputComponent>
                </Row>
                <Row>
                  <InputComponent
                    label="Controller account"
                    required
                    inputSize="l"
                    tooltipText="Controller account is the account which is used to sign most of the transactions, such as bonding a staking account, posting to forum, creating proposals or making a simple transfer to a different account. Controller account can be changed, and this transaction can only be signed by membership root account."
                  >
                    <SelectAccount name="controllerAccount" />
                  </InputComponent>
                </Row>
              </>
            )}
            <Row>
              <InputComponent id="member-name" label="Member Name" required name="name">
                <InputText id="member-name" placeholder="Type" name="name" />
                <Tooltip
                  tooltipText="This is your name, which is separate to your handle. It will only be displayed on the membership details pages. SomeDAO participants choose to use their real names, while others choose to use their nicknames. Name does not have to be unique."
                  tooltipTitle="Name"
                >
                  <TooltipDefault />
                </Tooltip>
              </InputComponent>
            </Row>
            <Row>
              <InputComponent id="membership-handle" label="Membership handle" required name="handle">
                <InputText id="membership-handle" placeholder="Type" name="handle" />
                <Tooltip
                  tooltipText="This is your username that will be displayed in most of the places where you perform actions that others see, such as forum posts, present yourself as council candidate or create a new proposal. Think of it as a public name. Handles are unique."
                  tooltipTitle="Handle"
                >
                  <TooltipDefault />
                </Tooltip>
              </InputComponent>
            </Row>
            <Row>
              <InputComponent id="member-about" label="About member" inputSize="l">
                <InputTextarea id="member-about" placeholder="Type" name="about" />
              </InputComponent>
            </Row>

            <AvatarInput />

            <SocialMediaSelector />

            {process.env.REACT_APP_CAPTCHA_SITE_KEY && type === 'onBoarding' && (
              <Row>
                <HCaptcha
                  sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                  theme="light"
                  languageOverride="en"
                  onVerify={(token) => form.setValue('captchaToken', token)}
                />
              </Row>
            )}
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
                tooltipText="Creation fee is the price of membership, it is managed by council through the proposal system. It is inclusive of transaction fee."
                tooltipLinkURL="https://joystream.gitbook.io/joystream-handbook/governance/proposals"
                tooltipLinkText="Learn more"
              />
            </TransactionInfoContainer>
          )}
          <ButtonPrimary
            size="medium"
            onClick={() => {
              const values = form.getValues()
              uploadAvatarAndSubmit({ ...values, externalResources: { ...definedValues(values.externalResources) } })
            }}
            disabled={isDisabled}
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
