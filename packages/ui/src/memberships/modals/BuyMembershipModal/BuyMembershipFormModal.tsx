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
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { SocialMediaSelector } from '@/memberships/components/SocialMediaSelector'
import { useGetMembersCountQuery } from '@/memberships/queries'

import { SelectMember } from '../../components/SelectMember'
import { AccountSchema, AvatarURISchema, HandleSchema, ReferrerSchema } from '../../model/validation'
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
  externalResources: Yup.object().shape({
    EMAIL: Yup.string().email('Field has to be a valid email address'),
    HYPERLINK: Yup.string().url('Invalid hyperlink format'),
  }),
})

export interface MemberFormFields {
  rootAccount?: Account
  controllerAccount?: Account
  name: string
  handle: string
  about: string
  avatarUri: string
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
  avatarUri: '',
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

  const hasError = enhancedHasError(form.formState.errors)
  const getErrorMessage = enhancedGetErrorMessage(form.formState.errors)
  const onCreate = () => {
    const values = form.getValues()
    onSubmit({ ...values, externalResources: { ...definedValues(values.externalResources) } })
  }

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
              <InputComponent
                id="member-name"
                label="Member Name"
                required
                validation={hasError('name') ? 'invalid' : undefined}
                message={hasError('name') ? getErrorMessage('name') : ''}
              >
                <InputText id="member-name" placeholder="Type" name="name" />
              </InputComponent>
            </Row>
            <Row>
              <InputComponent
                id="membership-handle"
                label="Membership handle"
                required
                validation={hasError('handle') ? 'invalid' : undefined}
                message={hasError('handle') ? getErrorMessage('handle') : ''}
              >
                <InputText id="membership-handle" placeholder="Type" name="handle" />
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
            </Row>
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
            id={'privacy-policy-agreement'}
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
          <ButtonPrimary size="medium" onClick={onCreate} disabled={!form.formState.isValid}>
            Create a Membership
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
