import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import { blake2AsHex } from '@polkadot/util-crypto'
import React, { useCallback, useEffect, useReducer } from 'react'
import * as Yup from 'yup'
import { Account, BaseMember, Member } from '../../common/types'
import { filterAccount, SelectAccount } from '../../components/account/SelectAccount'
import { Button } from '../../components/buttons'
import {
  Checkbox,
  InlineToggleWrap,
  Label,
  LabelLink,
  TextArea,
  TextInput,
  ToggleCheckbox,
} from '../../components/forms'
import { FieldError, getErrorMessage, hasError } from '../../components/forms/FieldError'
import { Input, InputComponent } from '../../components/forms/InputComponent'
import { Help } from '../../components/Help'
import { SelectMember } from '../../components/membership/SelectMember'
import {
  ModalFooter,
  ModalHeader,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '../../components/Modal'
import { Text, TokenValue } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useFormValidation } from '../../hooks/useFormValidation'
import { useObservable } from '../../hooks/useObservable'
import { AccountSchema, AvatarURISchema, HandleSchema, ReferrerSchema } from '../../membership/data/validation'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'
import { FormFields, formReducer } from './formReducer'

interface CreateProps {
  onClose: () => void
  onSubmit: (params: Member) => void
  membershipPrice?: BalanceOf
}

const CreateMemberSchema = Yup.object().shape({
  rootAccount: AccountSchema.required(),
  controllerAccount: AccountSchema.required(),
  avatarURI: AvatarURISchema,
  name: Yup.string().required(),
  handle: HandleSchema.required(),
  hasTerms: Yup.boolean().required().oneOf([true]),
  isReferred: Yup.boolean(),
  referrer: ReferrerSchema,
})

export const MembershipFormModal = ({ onClose, onSubmit, membershipPrice }: CreateProps) => {
  const { api } = useApi()
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    rootAccount: undefined,
    controllerAccount: undefined,
    handle: '',
    about: '',
    avatarURI: '',
    isReferred: false,
    referrer: undefined,
    hasTerms: false,
  })
  const { rootAccount, controllerAccount, handle, name, isReferred, avatarURI, about, referrer } = state

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
                checked={isReferred}
              />
            </InlineToggleWrap>
            {isReferred && (
              <SelectMember
                onChange={(member) => changeField('referrer', member)}
                disabled={!isReferred}
                selected={referrer}
              />
            )}
          </Row>

          <Row>
            <Text size={2} dark>
              Please fill in all the details below.
            </Text>
          </Row>

          <Row>
            <Label isRequired>
              Root account <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
            </Label>
            <SelectAccount filter={filterRoot} onChange={(account) => changeField('rootAccount', account)} />
          </Row>

          <InputComponent label="Root account" required>
            <SelectAccount filter={filterRoot} onChange={(account) => changeField('rootAccount', account)} />
          </InputComponent>

          <Row>
            <Label isRequired>
              Controller account <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
            </Label>
            <SelectAccount
              filter={filterController}
              onChange={(account) => changeField('controllerAccount', account)}
            />
          </Row>

          <Row>
            <Label htmlFor="member-name" isRequired>
              Member Name
            </Label>
            <TextInput
              id="member-name"
              type="text"
              placeholder="Type"
              value={name}
              onChange={(event) => changeField('name', event.target.value)}
            />
          </Row>

          <Row>
            <Label htmlFor="member-handle" isRequired>
              Membership handle
            </Label>
            <TextInput
              id="member-handle"
              type="text"
              placeholder="Type"
              value={handle}
              onChange={(event) => changeField('handle', event.target.value)}
              invalid={hasError('handle', errors)}
            />
            <FieldError name="handle" errors={errors} />
          </Row>

          <Row>
            <Label htmlFor="member-about">About Member</Label>
            <TextArea
              id="member-about"
              value={about}
              placeholder="Type"
              rows={4}
              onChange={(event) => changeField('about', event.target.value)}
            />
          </Row>

          <InputComponent
            label="Member Avatar"
            required
            inputType="text"
            value={avatarURI}
            validation={hasError('avatarURI', errors) ? 'invalid' : undefined}
            message={
              hasError('avatarURI', errors)
                ? getErrorMessage('avatarURI', errors)
                : 'Paste an URL of your avatar image. Text lorem ipsum.'
            }
            placeholder="Image URL"
            id="member-avatar"
          >
            <Input
              id="member-avatar"
              value={avatarURI}
              onChange={(event) => changeField('avatarURI', event.target.value)}
            />
          </InputComponent>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <Label>
          <Checkbox id={'privacy-policy-agreement'} onChange={(value) => changeField('hasTerms', value)}>
            <Text size={2} dark={true}>
              I agree to the{' '}
              <LabelLink href={'http://example.com/'} target="_blank">
                Terms of Service
              </LabelLink>{' '}
              and{' '}
              <LabelLink href={'http://example.com/'} target="_blank">
                Privacy Policy
              </LabelLink>
              .
            </Text>
          </Checkbox>
        </Label>
        <BalanceInfoNarrow>
          <InfoTitle>Creation fee:</InfoTitle>
          <InfoValue>
            <TokenValue value={membershipPrice?.toBn()} />
          </InfoValue>
          <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
        </BalanceInfoNarrow>
        <Button size="medium" onClick={onCreate} disabled={!isValid}>
          Create a Membership
        </Button>
      </ModalFooter>
    </ScrolledModal>
  )
}
