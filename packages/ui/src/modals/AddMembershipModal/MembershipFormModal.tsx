import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import { blake2AsHex } from '@polkadot/util-crypto'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import * as Yup from 'yup'
import { ValidationError } from 'yup'
import { Account, Member } from '../../common/types'
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
import { FieldError, hasError } from '../../components/forms/FieldError'
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
import { useObservable } from '../../hooks/useObservable'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from '../common'

interface CreateProps {
  onClose: () => void
  onSubmit: (params: Member) => void
  membershipPrice?: BalanceOf
}

interface Form {
  rootAccount: Account | undefined
  controllerAccount: Account | undefined
  name: string
  handle: string
  about: string
  avatarURI: string
  isReferred: boolean
  hasTerms: boolean
}

type Action = { type: keyof Form; value: string | Account | boolean }

const formReducer = (state: Form, action: Action): Form => {
  switch (action.type) {
    case 'name':
    case 'handle':
    case 'about':
    case 'avatarURI':
      return { ...state, [action.type]: action.value as string }
    case 'rootAccount':
    case 'controllerAccount':
      return { ...state, [action.type]: action.value as Account }
    case 'hasTerms':
    case 'isReferred':
      return { ...state, [action.type]: action.value as boolean }
    default:
      return { ...state }
  }
}

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
    hasTerms: false,
  })
  const { rootAccount, controllerAccount, handle, name, isReferred, avatarURI, about } = state

  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])
  const [isFormValid, setFormValid] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])
  const handleHash = blake2AsHex(handle)
  const changeField = (type: keyof Form, value: string | Account | boolean) => {
    dispatch({ type, value })
  }

  const potentialMemberId = useObservable(api?.query.members.memberIdByHandleHash(handleHash), [handle])
  const existingMember = useObservable(api?.query.members.membershipById(potentialMemberId || 0), [potentialMemberId])
  const isHandleTaken = existingMember?.handle_hash.toJSON() === handleHash

  const Schema = Yup.object().shape({
    rootAccount: Yup.object().required(),
    controllerAccount: Yup.object().required(),
    avatarURI: Yup.string().url(),
    name: Yup.string().required(),
    handle: Yup.string()
      .test('handle', 'This handle is already taken', () => !isHandleTaken)
      .required(),
    hasTerms: Yup.boolean().required().oneOf([true]),
  })

  useEffect(() => {
    let stillWaiting = true
    setFormValid(false)

    Schema.validate(state, { abortEarly: false, stripUnknown: true })
      .then(() => {
        if (stillWaiting) {
          setFormValid(true)
          setErrors([])
        }
      })
      .catch((error) => {
        if (stillWaiting) {
          setFormValid(false)
          setErrors(error.inner)
        }
      })

    return () => {
      stillWaiting = false
    }
  }, [state])

  const onCreate = () => {
    if (!state.controllerAccount || !state.rootAccount) {
      return
    }

    onSubmit(state as any)
  }
  const stubHandler = () => undefined

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
            <SelectMember onChange={stubHandler} disabled={!isReferred} />
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

          <Row>
            <Label htmlFor="member-avatar">Member Avatar</Label>
            <TextInput
              id="member-avatar"
              type="text"
              placeholder="Image URL"
              value={avatarURI}
              onChange={(event) => changeField('avatarURI', event.target.value)}
              invalid={hasError('avatarURI', errors)}
            />
            <Text size={3} italic={true}>
              Paste an URL of your avatar image. Text lorem ipsum.
            </Text>
            <FieldError name="avatarURI" errors={errors} />
          </Row>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <Label>
          <Checkbox id={'privacy-policy-agreement'} onChange={(value) => changeField('hasTerms', value)}>
            <Text size={2} dark={true}>
              I agree to our{' '}
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
        <Button size="medium" onClick={onCreate} disabled={!isFormValid}>
          Create a Membership
        </Button>
      </ModalFooter>
    </ScrolledModal>
  )
}
