import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import { blake2AsHex } from '@polkadot/util-crypto'
import React, { useCallback, useEffect, useReducer } from 'react'
import * as Yup from 'yup'

import { filterAccount, SelectAccount } from '../../../accounts/components/SelectAccount'
import { Account } from '../../../accounts/types'
import { ButtonPrimary } from '../../../common/components/buttons'
import {
  Checkbox,
  InlineToggleWrap,
  InputComponent,
  InputText,
  InputTextarea,
  Label,
  LabelLink,
  ToggleCheckbox,
} from '../../../common/components/forms'
import { getErrorMessage, hasError } from '../../../common/components/forms/FieldError'
import { Help } from '../../../common/components/Help'
import {
  ModalFooter,
  ModalFooterGroup,
  ModalHeader,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '../../../common/components/Modal'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../../../common/components/Modals'
import { TextMedium, TokenValue } from '../../../common/components/typography'
import { useApi } from '../../../common/hooks/useApi'
import { useFormValidation } from '../../../common/hooks/useFormValidation'
import { useObservable } from '../../../common/hooks/useObservable'
import { SelectMember } from '../../components/SelectMember'
import { AccountSchema, AvatarURISchema, HandleSchema, ReferrerSchema } from '../../model/validation'
import { BaseMember, Member } from '../../types'

import { FormFields, formReducer } from './formReducer'

interface CreateProps {
  onClose: () => void
  onSubmit: (params: Member) => void
  membershipPrice?: BalanceOf
}

const CreateMemberSchema = Yup.object().shape({
  rootAccount: AccountSchema.required(),
  controllerAccount: AccountSchema.required(),
  avatarUri: AvatarURISchema,
  name: Yup.string().required(),
  handle: HandleSchema.required(),
  hasTerms: Yup.boolean().required().oneOf([true]),
  isReferred: Yup.boolean(),
  referrer: ReferrerSchema,
})

export const BuyMembershipFormModal = ({ onClose, onSubmit, membershipPrice }: CreateProps) => {
  const { api } = useApi()
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    rootAccount: undefined,
    controllerAccount: undefined,
    handle: '',
    about: '',
    avatarUri: '',
    isReferred: false,
    referrer: undefined,
    hasTerms: false,
  })
  const { rootAccount, controllerAccount, handle, name, isReferred, avatarUri, about, referrer } = state

  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])

  const handleHash = blake2AsHex(handle)
  const potentialMemberIdSize = useObservable(api?.query.members.memberIdByHandleHash.size(handleHash), [handle])
  const { isValid, errors, validate } = useFormValidation<FormFields>(CreateMemberSchema)

  useEffect(() => {
    validate(state, { size: potentialMemberIdSize })
  }, [state, potentialMemberIdSize])

  const changeField = (type: keyof FormFields, value: string | Account | BaseMember | boolean) => {
    dispatch({ type, value })
  }

  const onCreate = () => {
    if (!controllerAccount || !rootAccount) {
      return
    }

    onSubmit(state as Member)
  }

  return (
    <ScrolledModal modalSize="m" modalHeight="m" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Add membership" />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <Row>
            <InlineToggleWrap>
              <Label>I was referred by a member: </Label>
              <ToggleCheckbox
                trueLabel="Yes"
                falseLabel="No"
                onChange={(isSet) => changeField('isReferred', isSet)}
                checked={isReferred ?? false}
              />
            </InlineToggleWrap>
            {isReferred && (
              <InputComponent required inputSize="l">
                <SelectMember
                  onChange={(member) => changeField('referrer', member)}
                  disabled={!isReferred}
                  selected={referrer}
                />
              </InputComponent>
            )}
          </Row>

          <Row>
            <TextMedium dark>Please fill in all the details below.</TextMedium>
          </Row>

          <Row>
            <InputComponent label="Root account" required inputSize="l" helperText="Something about root accounts">
              <SelectAccount filter={filterRoot} onChange={(account) => changeField('rootAccount', account)} />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent
              label="Controller account"
              required
              inputSize="l"
              helperText="Something about controller account"
            >
              <SelectAccount
                filter={filterController}
                onChange={(account) => changeField('controllerAccount', account)}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent id="member-name" label="Member Name" required>
              <InputText
                id="member-name"
                placeholder="Type"
                value={name}
                onChange={(event) => changeField('name', event.target.value)}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent id="membership-handle" label="Membership handle" required>
              <InputText
                id="membership-handle"
                placeholder="Type"
                value={handle}
                onChange={(event) => changeField('handle', event.target.value)}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent id="member-about" label="About member" inputSize="l">
              <InputTextarea
                id="member-about"
                value={about}
                placeholder="Type"
                onChange={(event) => changeField('about', event.target.value)}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent
              id="member-avatar"
              label="Member Avatar"
              required
              value={avatarUri}
              validation={hasError('avatarUri', errors) ? 'invalid' : undefined}
              message={
                hasError('avatarUri', errors)
                  ? getErrorMessage('avatarUri', errors)
                  : 'Paste an URL of your avatar image. Text lorem ipsum.'
              }
              placeholder="Image URL"
            >
              <InputText
                id="member-avatar"
                value={avatarUri}
                onChange={(event) => changeField('avatarUri', event.target.value)}
              />
            </InputComponent>
          </Row>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter twoColumns>
        <ModalFooterGroup left>
          <Checkbox id={'privacy-policy-agreement'} onChange={(value) => changeField('hasTerms', value)}>
            <TextMedium colorInherit>
              I agree to the{' '}
              <LabelLink href={'http://example.com/'} target="_blank">
                Terms of Service
              </LabelLink>{' '}
              and{' '}
              <LabelLink href={'http://example.com/'} target="_blank">
                Privacy Policy
              </LabelLink>
              .
            </TextMedium>
          </Checkbox>
        </ModalFooterGroup>
        <ModalFooterGroup>
          <BalanceInfoNarrow>
            <InfoTitle>Creation fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={membershipPrice?.toBn()} />
            </InfoValue>
            <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} absolute />
          </BalanceInfoNarrow>
          <ButtonPrimary size="medium" onClick={onCreate} disabled={!isValid}>
            Create a Membership
          </ButtonPrimary>
        </ModalFooterGroup>
      </ModalFooter>
    </ScrolledModal>
  )
}
