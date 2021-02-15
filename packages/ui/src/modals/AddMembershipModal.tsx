import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { ButtonPrimaryMedium } from '../components/buttons'
import { Checkbox, InlineToggleWrap, Label, LabelLink, TextInput, ToggleCheckbox } from '../components/forms'
import { Help } from '../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader, ScrolledModalBody } from '../components/Modal'
import { filterAccount, SelectAccount } from '../components/selects/SelectAccount'
import { Text, TokenValue } from '../components/typography'
import { Account } from '../hooks/types'
import { useApi } from '../hooks/useApi'
import { useObservable } from '../hooks/useObservable'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from './common'

interface MembershipModalProps {
  onClose: () => void
}

type ModalState = 'Create' | 'Authorize'

const AvatarSchema = Yup.string().url()

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [state, setState] = useState<ModalState>('Create')
  const [rootAccount, setRootAccount] = useState<Account | undefined>()
  const [controllerAccount, setControllerAccount] = useState<Account | undefined>()
  const [name, setName] = useState('Bobby bob')
  const [handle, setHandle] = useState('bob')
  const [about, setAbout] = useState('I am bob')
  const [avatar, setAvatar] = useState(
    'https://www.gravatar.com/avatar/50284e458f1aa6862cc23a26fdcc3db1?s=200&r=pg&d=404'
  )
  const [isReferred, setIsReferred] = useState(false)
  const [hasTermsAgreed, setTerms] = useState(false)
  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])
  const [isFormValid, setFormValid] = useState(false)
  const isNotEmpty =
    !isReferred && !!rootAccount && !!controllerAccount && !!name && !!handle && !!about && !!avatar && hasTermsAgreed

  useEffect(() => {
    if (avatar) {
      AvatarSchema.isValid(avatar).then((isAvatarValid) => {
        setFormValid(isNotEmpty && isAvatarValid)
      })
    } else {
      setFormValid(isNotEmpty)
    }
  }, [rootAccount, controllerAccount, name, handle, about, avatar, isReferred, hasTermsAgreed])

  const stubHandler = () => undefined

  const onSubmit = () => {
    setState('Authorize')
  }

  if (state === 'Create') {
    return (
      <Modal modalSize="m">
        <ModalHeader onClick={onClose} title="Add membership" />
        <ScrolledModalBody>
          <Row>
            <InlineToggleWrap>
              <Label>I was referred by a member: </Label>
              <ToggleCheckbox trueLabel="Yes" falseLabel="No" onChange={setIsReferred} checked={isReferred} disabled />
            </InlineToggleWrap>
            <TextInput
              type="text"
              value="Select Member or type a member"
              disabled={!isReferred}
              onChange={stubHandler}
            />
            <p>Please fill in all the details below.</p>
          </Row>

          <Row>
            <Label>
              Root account <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} /> *
            </Label>
            <SelectAccount filter={filterRoot} onChange={setRootAccount} />
          </Row>

          <Row>
            <Label>
              Controller account <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} /> *
            </Label>
            <SelectAccount filter={filterController} onChange={setControllerAccount} />
          </Row>

          <Row>
            <Label>Member Name *</Label>
            <TextInput type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </Row>

          <Row>
            <Label>Membership handle *</Label>
            <TextInput type="text" value={handle} onChange={(event) => setHandle(event.target.value)} />
          </Row>

          <Row>
            <Label>About Member *</Label>
            <TextInput type="text" value={about} onChange={(event) => setAbout(event.target.value)} />
          </Row>

          <Row>
            <Label>Member Avatar *</Label>
            <TextInput type="text" value={avatar} onChange={(event) => setAvatar(event.target.value)} />
          </Row>
        </ScrolledModalBody>
        <ModalFooter>
          <Label>
            <Checkbox id={'privacy-policy-agreement'} onChange={(value) => setTerms(value)}>
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
          <ButtonPrimaryMedium onClick={onSubmit} disabled={!isFormValid}>
            Create a Membership
          </ButtonPrimaryMedium>
        </ModalFooter>
      </Modal>
    )
  }

  const transactionFee = 0

  return (
    <Modal modalSize="m" modalHeight="s">
      <ModalHeader onClick={onClose} title="Authorize transaction" />
      <ModalBody>
        <Text>You are intend to create a new membership</Text>
        <Text>
          The creation of the new membership costs <TokenValue value={membershipPrice} />
        </Text>
        <Text>
          Fees of <TokenValue value={transactionFee} /> will be applied to the transaction
        </Text>
        <Row>
          <Label>Sending from account</Label>
          <SelectAccount onChange={() => undefined} />
        </Row>
      </ModalBody>
      <ModalFooter>
        <BalanceInfoNarrow>
          <InfoTitle>Creation fee:</InfoTitle>
          <InfoValue>
            <TokenValue value={membershipPrice?.toBn()} />
          </InfoValue>
          <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
          <InfoTitle>Transaction fee:</InfoTitle>
          <InfoValue>
            <TokenValue value={transactionFee} />
          </InfoValue>
          <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
        </BalanceInfoNarrow>
        <ButtonPrimaryMedium>Sign and create a member</ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}
