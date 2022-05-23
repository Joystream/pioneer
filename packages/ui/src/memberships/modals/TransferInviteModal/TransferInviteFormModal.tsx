import BN from 'bn.js'
import React, { ReactElement, useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { InviteMembershipFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'
import { AccountSchema } from '@/memberships/model/validation'

import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent, InputNumber } from '../../../common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader, Row, TransactionAmount } from '../../../common/components/Modal'
import { TextMedium } from '../../../common/components/typography'
import { filterMember, SelectMember } from '../../components/SelectMember'
import { Member } from '../../types'

interface Props {
  onClose: () => void
  onAccept: (amount: BN, from: Member, to: Member) => void
  icon: ReactElement
  member?: Member
}

const formDefaultValues = {
  from: undefined,
  amount: undefined,
  to: undefined,
}

export function TransferInviteFormModal({ onClose, onAccept, icon, member }: Props) {
  const filterRecipient = useCallback(filterMember(member), [member])
  const TransferInviteSchema = Yup.object().shape({
    from: AccountSchema.required('This field is required'),
    amount: Yup.number()
      .max(member?.inviteCount ?? 0, `You only have ${member?.inviteCount} invites left.`)
      .required('This field is required'),
    to: AccountSchema.required('This field is required'),
  })

  const form = useForm<InviteMembershipFormFields>({
    resolver: useYupValidationResolver(TransferInviteSchema),
    mode: 'onChange',
    defaultValues: formDefaultValues,
  })

  useEffect(() => {
    return form.setValue('from', member)
  }, [member])

  const [from, to] = form.watch(['from', 'to'])
  const hasError = enhancedHasError(form.formState.errors)
  const getErrorMessage = enhancedGetErrorMessage(form.formState.errors)

  const setReceiverAccount = useCallback(
    (member: Member) => {
      form.setValue('to', member, { shouldValidate: true })
    },
    [form.setValue]
  )
  const onSubmit = () => {
    const values = form.getValues()
    onAccept(new BN(values.amount), values.from as Member, values.to)
  }

  return (
    <Modal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Transfer invites" icon={icon} />
      <ModalBody>
        <Row>
          <TextMedium margin="s">Transfer Invites to a member.</TextMedium>
        </Row>
        <FormProvider {...form}>
          <InputComponent label="From" inputSize="l" disabled={!!member}>
            <SelectMember
              onChange={(member) => form.setValue('from', member, { shouldValidate: true })}
              disabled={!!member}
              selected={from}
            />
          </InputComponent>
          <TransactionAmount>
            <InputComponent
              id="amount-input"
              label="Number of Invites"
              required
              validation={hasError('amount') ? 'invalid' : undefined}
              message={hasError('amount') ? getErrorMessage('amount') : `You have ${member?.inviteCount} invites.`}
              inputWidth="s"
            >
              <InputNumber id="amount-input" placeholder="0" name="amount" />
            </InputComponent>
          </TransactionAmount>
          <InputComponent
            label="To"
            inputSize="l"
            required
            validation={hasError('controllerAccount') ? 'invalid' : undefined}
            message={hasError('to') ? getErrorMessage('to') : ' '}
          >
            <SelectMember
              onChange={(receiverAccount) => setReceiverAccount(receiverAccount)}
              filter={filterRecipient}
              selected={to}
            />
          </InputComponent>
        </FormProvider>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onSubmit} disabled={!form.formState.isValid}>
          Transfer Invites
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
